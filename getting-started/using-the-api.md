# Using the API

## Quickstart

To get started with the API, the first thing you’ll need is an API key. You can get one by logging into the playground and heading to "Console" at [play.cartesia.ai/console](https://play.cartesia.ai/console).

To generate your first words, run this command in your terminal, replacing `YOUR_API_KEY`:

{% code overflow="wrap" %}
```bash
curl -i -N -X POST "https://api.cartesia.ai/v0/audio/sse" -H "X-API-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"transcript": "Hello World! My name is Cartesia.", "model_id": "upbeat-moon", "voice": {"mode":"id", "id": "79f8b5fb-2cc8-479a-80df-29f7a7cf1a3e"}, "output_format":{"container":"raw", "encoding":"pcm_f32le", "sample_rate":44100}}'
```
{% endcode %}

This command calls the [text-to-speech.md](../api-reference/text-to-speech.md "mention") endpoint which runs the text-to-speech generation and transmits the output in chunks.  Each chunk is a JSON string containing a chunk of audio data and its associated metadata.

{% hint style="info" %}
See [text-to-speech.md](../api-reference/text-to-speech.md "mention") for an exhaustive enumeration of the fields returned by the API.
{% endhint %}

{% hint style="info" %}
The voice used in this example can be found in the Voices tab of the playground at [https://play.cartesia.ai/voices/79f8b5fb-2cc8-479a-80df-29f7a7cf1a3e](https://play.cartesia.ai/voices/79f8b5fb-2cc8-479a-80df-29f7a7cf1a3e)
{% endhint %}

## API Conventions

{% hint style="danger" %}
All endpoints use HTTPS. HTTP is not supported. API keys that call the API over HTTP may be subject to automatic rotation.
{% endhint %}

All API requests use the following base URL: `https://api.cartesia.ai`. (For WebSockets the corresponding protocol is `wss://`.)

### Send a `Cartesia-Version` header

If you're using Cartesia in production, each request you send our API should have a `Cartesia-Version` header containing the date (`YYYY-MM-DD`) when you tested your integration.

This will help us provide you with timely deprecation notices and enable us to provide automatic backwards compatibility where possible.

For a given `Cartesia-Version`, we will preserve existing input and output fields, but we may make non-breaking changes, such as:

1. Add optional request fields.
2. Add additional response fields.
3. Change conditions for specific error types
4. Add variants to enum-like output values.

Our versioning scheme is inspired by the [Anthropic API](https://docs.anthropic.com/en/api/versioning).

### Use API keys to authenticate

Authentication is handled using API keys. You can create a new API key from [play.cartesia.ai/console](https://play.cartesia.ai/console).

* For HTTP requests, authentication is handled by adding the field `X-API-Key: <your_api_key>` into the HTTP headers.
* For WebSocket connections, authentication is handled by passing in the field `?api_key=<your_api_key>` when creating the WebSocket connection.

### Check response codes

Our API uses standard HTTP response codes; refer to [httpstatuses.io](https://httpstatuses.io).

### Pass data according to the method

All GET requests use query parameters to pass data. All POST requests use a JSON body or `multipart/form-data`.

