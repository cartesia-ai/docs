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
