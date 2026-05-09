ifneq ($(shell which tput),)
	ifneq ($(TERM),)
		RED    := $(shell tput setaf 1)
		GREEN  := $(shell tput setaf 2)
		YELLOW := $(shell tput setaf 3)
		CYAN   := $(shell tput setaf 6)
		RESET  := $(shell tput sgr0)
	endif
endif

lint:
	@echo "Linting code..."
	pre-commit run ruff-check --hook-stage manual --all-files

format:
	@echo "Formatting code..."
	pre-commit run prettier-js --all-files
	pre-commit run pyupgrade --all-files
	pre-commit run isort --all-files
	pre-commit run ruff-format --all-files

livereload:
	node scripts/livereload.js

test:
	vitest run

bump-version:
	@BUMP=$(word 2,$(MAKECMDGOALS)); \
	VALID_BUMP="major minor patch"; \
	if [ -z "$$BUMP" ]; then \
		echo "$(RED)Error: Bump is required.$(RESET)"; \
		echo "Usage: make bump-version [major|minor|patch]"; \
		exit 1; \
	fi; \
	if ! echo "$$VALID_BUMP" | grep -qw "$$BUMP"; then \
		echo "$(RED)Error: Invalid bump '$$BUMP'.$(RESET)"; \
		echo "Must be one of: $(CYAN)$$VALID_BUMP$(RESET)"; \
		exit 1; \
	fi; \
	npm version $$BUMP; \
	uv version --bump $$BUMP; \
	VERSION=$$(uv version --short); \
	git add \
		pyproject.toml \
		uv.lock; \
	git commit -m $$VERSION;

build:
	node scripts/bokeh-palettes.js
	node scripts/vega-palettes.js
	rm -fr src/css/background-color/*
	rm -fr src/css/color/*
	rm -f src/css/background-color.scss
	rm -f src/css/color.scss
	rm -fr cjs/*
	rm -fr css/*
	rm -fr demo/*
	rm -fr illustrator/*
	rm -fr umd/*
	node scripts/build-js.js
	node scripts/build-css.js
	node scripts/build-illustrator.js
	node scripts/build-demo.js
	rm -fr build/*
	rm -fr dist/*
	uv build
	twine check dist/*

build-and-commit:
	@VERSION=$$(uv version --short); \
	git add cjs css demo illustrator umd; \
	git commit -m "Build $$VERSION";

create-release:
	@VERSION=$$(uv version --short); \
	gh release create $$VERSION;

publish:
	npm publish
	twine upload --config-file .pypirc --verbose dist/*

deploy:
	node scripts/deploy.js

# Prevent make from treating arguments to bump-version as targets
ifeq (bump-version,$(firstword $(MAKECMDGOALS)))
%:
	@:
endif
