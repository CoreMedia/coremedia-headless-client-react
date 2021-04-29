# CoreMedia Headless Stitching Documentation

[Documentation](../README.md) / Installation (Stitching Server)

---

# Installation and Start (Stitching Server)

The following commands should all be called in the stitching directory.

```bash
cd servers/stitching
```

## Installation

```bash
yarn install
yarn build
```
Copy of the file .env.example to .env and configure both endpoints. To establish the default
mocking mode the CATALOG_ENDPOINT can be left commented out. In a "real" scenario you would
configure the Commerce Headless GraphQL url instead.

```
COREMEDIA_ENDPOINT=http://<coremedia-headless-server>/graphql
#CATALOG_ENDPOINT=http://<commerce-headless-server>/graphql
```

## Usage

```bash
yarn start
```

## Building the Docker Container
```shell
docker build -t <REGISTRY_NAME>/schema-stitching-app .
```

```shell
docker run -p 12345:4000 -e COREMEDIA_ENDPOINT= -e CATALOG_ENDPOINT= -e <REGISTRY_NAME>/schema-stitching-app:latest
```
