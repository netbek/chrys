FROM python:3.8.18-slim-bookworm

COPY scripts /build/scripts
COPY package.json /build/package.json
COPY package-lock.json /build/package-lock.json
COPY pyproject.toml /build/pyproject.toml
COPY README.md /build/README.md
COPY requirements.txt /build/requirements.txt
COPY setup.cfg /build/setup.cfg
COPY setup.py /build/setup.py

RUN apt-get update --yes && \
    apt-get install --yes --no-install-recommends \
    build-essential curl

WORKDIR /build

RUN pip install --no-cache-dir --upgrade pip && \
    pip install setuptools==51.1.2 twine==3.3.0 wheel==0.36.2 && \
    pip install --no-cache-dir --requirement requirements.txt

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash && \
    . "${HOME}/.bashrc" && \
    nvm install v16.20.2 && \
    nvm alias default v16.20.2 && \
    npm ci && \
    ./scripts/npm/postinstall.sh

CMD . /root/.bashrc && npm run build-data && npm run build-dist
