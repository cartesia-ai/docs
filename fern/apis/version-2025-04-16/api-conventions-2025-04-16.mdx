<Warning>
  All endpoints use HTTPS. HTTP is not supported. API keys that call the API
  over HTTP may be subject to automatic rotation.
</Warning>

All API requests use the following base URL: `https://api.cartesia.ai`. (For WebSockets the corresponding protocol is `wss://`.)

### Always send a `Cartesia-Version` header

Each request you send our API should have a `Cartesia-Version` header containing the date (`YYYY-MM-DD`) when you tested your integration. For WebSockets, you can alternately use the `?cartesia_version` query parameter, which will take precedence.

This will help us provide you with timely deprecation notices and enable us to provide automatic backwards compatibility where possible.

For a given `Cartesia-Version`, we will preserve existing input and output fields, but we may make non-breaking changes, such as:

1. Add optional request fields.
2. Add additional response fields.
3. Change conditions for specific error types
4. Add variants to enum-like output values.

Our versioning scheme is inspired by the [Anthropic API](https://docs.anthropic.com/en/api/versioning).

### Use API keys to authenticate

Authentication is handled using API keys. You can create a new API key from [play.cartesia.ai/keys](https://play.cartesia.ai/keys).

Client apps making Cartesia API requests should use Access Tokens, to avoid exposing your API Key. Your server generates an Access Token and sends it to your client, which in turn includes `Authorization: Bearer <access_token>` in the HTTP headers of Cartesia API requests.
Read the full documentation for this at [Access Token API Reference](/api-reference/auth/access-token) for more info.

For WebSocket connections, authenticate by passing in the field `?api_key=<your_api_key>` when creating the WebSocket connection from the server, and passing in `?access_token=<access_token>` when creating from the client.

### Check response codes

Our API uses standard HTTP response codes; refer to [httpstatuses.io](https://httpstatuses.io).

### Pass data according to the method

All GET requests use query parameters to pass data. All POST requests use a JSON body or `multipart/form-data`.
