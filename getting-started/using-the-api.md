# Using the API

## Quickstart

To get started with the API, the first thing you’ll need is an API key. You can get one by logging into the playground and heading to "Console" at [play.cartesia.ai/console](https://play.cartesia.ai/console).

To generate your first words, run this command in your terminal, replacing `YOUR_API_KEY`:

{% code overflow="wrap" %}
```bash
curl -N -X POST "https://api.cartesia.ai/tts/bytes" \
        -H "Cartesia-Version: 2024-06-10" \
        -H "X-API-Key: YOUR_API_KEY" \
        -H "Content-Type: application/json" \
        -d '{"transcript": "Welcome to Cartesia Sonic!", "model_id": "upbeat-moon", "voice": {"mode":"id", "id": "a0e99841-438c-4a64-b679-ae501e7d6091"}, "output_format":{"container":"raw", "encoding":"pcm_f32le", "sample_rate":44100}}' \
        | ffmpeg -f f32le -i pipe: output.wav
```
{% endcode %}

This command calls the [text-to-speech.md](../api-reference/text-to-speech.md "mention") endpoint which runs the text-to-speech generation and transmits the output in raw bytes.

{% hint style="info" %}
The voice used in this example can be found [on the playground](https://play.cartesia.ai/voices/a0e99841-438c-4a64-b679-ae501e7d6091).
{% endhint %}

## API Conventions

{% hint style="danger" %}
All endpoints use HTTPS. HTTP is not supported. API keys that call the API over HTTP may be subject to automatic rotation.
{% endhint %}

All API requests use the following base URL: `https://api.cartesia.ai`. (For WebSockets the corresponding protocol is `wss://`.)

### Send a `Cartesia-Version` header

Each request you send our API should have a `Cartesia-Version` header containing the date (`YYYY-MM-DD`) when you tested your integration.

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

