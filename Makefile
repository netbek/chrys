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

bump-version:
	@BUMP=$(word 2,$(MAKECMDGOALS)); \
	VALID_BUMP="major minor patch premajor preminor prepatch prerelease"; \
	if [ -z "$$BUMP" ]; then \
		echo "$(RED)Error: Bump is required.$(RESET)"; \
		echo "Usage: make bump-version [major|minor|patch|premajor|preminor|prepatch|prerelease]"; \
		exit 1; \
	fi; \
	if ! echo "$$VALID_BUMP" | grep -qw "$$BUMP"; then \
		echo "$(RED)Error: Invalid bump '$$BUMP'.$(RESET)"; \
		echo "Must be one of: $(CYAN)$$VALID_BUMP$(RESET)"; \
		exit 1; \
	fi; \
	npm version $$BUMP;

create-release:
	@VERSION=$$(npm pkg get version --browser=false | tr -d '"'); \
	gh release create $$VERSION;

# Prevent make from treating arguments to bump-version as targets
ifeq (bump-version,$(firstword $(MAKECMDGOALS)))
%:
	@:
endif
