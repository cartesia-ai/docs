# Cartesia Documentation

This repo contains the configuration files for Cartesia's API documentation,
built using Fern.

Visit the [Cartesia Documentation](https://docs.cartesia.ai) to see the live
docs.

## Updating your Docs

### Local Development server

To run a local development server with hot-reloading you can run the following
command

```sh
fern docs dev
```

### Hosted URL

Documentation is automatically updated when you push to main via the
`fern generate` command.

```sh
npm install -g fern-api # only required once
fern generate --docs
```

## Generating preview SDKs

```sh
fern generate --preview --api version-2025-04-16 --group ts-sdk
fern generate --preview --api version-2025-04-16 --group python-sdk
```

Generated SDKs are available in `docs/fern/apis/version-2025-04-16/.preview/`:

```sh
$ ls fern/apis/version-2025-04-16/.preview
fern-python-sdk                 fern-typescript-node-sdk
```
