FROM python:3.8.2-buster

LABEL maintainer="akrolewiecki985@gmail.com"

ARG FASTAPI_ENV

ENV FASTAPI_ENV=${FASTAPI_ENV} \
    PYTHONFAULTHANDLER=1 \
    PYTHONHASHSEED=random \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHCECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    DOCKERIZE_VERSION=v0.6.1 \
    POETRY_VERSION=1.0.5 \
    POETRY_VIRTUALENVS_CREATE=false \
    POETRY_CACHE_DIR='/var/cache/pypoetry'
    

RUN apt-get update  &&\
    apt-get install -y \
    bash \
    build-essential \
    curl \
    git \
    libpq-dev \
    wget \

    && apt-get autoremove && apt-get clean && rm -rf /var/lib/apt/lists/* \

    && wget "https://github.com/jwilder/dockerize/releases/download/${DOCKERIZE_VERSION}/dockerize-linux-amd64-${DOCKERIZE_VERSION}.tar.gz" \
    && tar -C /usr/local/bin -xzvf "dockerize-linux-amd64-${DOCKERIZE_VERSION}.tar.gz" \
    && rm "dockerize-linux-amd64-${DOCKERIZE_VERSION}.tar.gz" && dockerize --version \
    && pip install "poetry==$POETRY_VERSION" && poetry --version

    WORKDIR /NOKIA
    COPY /backend/poetry.lock /backend/pyproject.toml /NOKIA/

    RUN echo "$FASTAPI_ENV" \
    	poetry install
    WORKDIR / 