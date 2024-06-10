---
description: >-
  Our stable API is now available. Our previous API (version 0) will be
  deprecated on June 17. All future deprecations will come with at least one
  month of deprecation notice.
---

# Migrating to the Stable API

{% hint style="info" %}
If you run into migration issues, please message our Discord (or shared Slack channel, if you're partnered with us). We're happy to help you migrate.
{% endhint %}

## API-wide changes

{% hint style="warning" %}
**You must now pass the Cartesia-Version header with every request.** (For WebSockets, you may pass  the`cartesia_version` query parameter.)
{% endhint %}

Remove the `/v0` prefix and instead supply a `Cartesia-Version` header containing the version (a date in YYYY-MM-DD format) you developed or tested your integration against. As of this documentation, the latest version is `2024-06-10`.

For WebSockets, you can alternatively specify the `cartesia_version` query parameter, which will take precedence.

## Voices

The `/voices/{id}/embedding` endpoint has been removed in favor of just `/voices/{id}`, which also returns other useful information about the voice. You should be able to just remove the `/embedding` suffix; any existing code that worked with the old endpoint should work with the new one.

## Text-to-Speech

Text-to-speech endpoints have all moved from `/audio` to `/tts`, so if you were hitting `/v0/audio/websocket`, you should now hit `/tts/websocket`. (Correspondingly, for Server-Sent Events, hit `/tts/sse`.)

### Request Format

Both the WebSocket and the Server-Sent Events endpoints now accept the same request format. (For WebSockets, send it over the WebSocket. For Server-Sent Events, send it in the request body.)

Here's what the new request format looks like, with required fields marked:

```json
{
  // Required.
  "model_id": "upbeat-moon",

  // Required.
  "voice": {
    // Required. Choices: id, embedding.
    "mode": "id",
    // Specify if mode is id.
    "id": "a167e0f3-df7e-4d52-a9c3-f949145efdab"
    // Specify if mode is embedding.
    "embedding": [...]
  },

  // Required.
  "output_format": {
    // Required. Choices: raw.
    "container": "raw",
    // Required. Choices: pcm_f32le, pcm_s16le, pcm_mulaw, pcm_alaw.
    "encoding": "pcm_f32le",
    // Required. Choices: 8000, 16000, 22050, 24000, 44100.
    "sample_rate": 44100,
  },
  
  // Required.
  "transcript": "Hello, world!",

  // Optional. If omitted, the maximum duration will be set to a very large value.
  "duration": 180,

  // Optional. If specified, the response will also include a context ID.
  "context_id": "happy-monkeys-fly"
}
```

Note that many previously optional fields (`model_id`, `output_format`) are now required.

**Chunk time and lookahead are no longer accepted as parameters.** If specified, they will be ignored.

### Response Format

1. We no longer return `sampling_rate`. The sampling rate passed in the request will be respected, and should be considered authoritative. If the passed sampling rate is unsupported, the API will throw an error.
2. We no longer return `length`. This should be easy to calculate by decoding the data.

### Server-Sent Events-specific changes

1. The deprecated API incorrectly implemented the Server-Sent Events response format, and was therefore rejected by standards-compliant parsers. This issue has been fixed.
2. Data responses will have `"done": false` and there will now be a final done event sent in the event stream, just like in the WebSocket. The final done event has the following format:

```json
{
  "done": true,
  "status_code": 200,

  // Omitted if request did not specify context ID.
  "context_id": "happy-monkeys-fly"
}
```

### WebSocket

1. You must specify inputs directly, without wrapping them in a `data` field, as shown under [#request-format](migrating-to-the-stable-api.md#request-format "mention").
2. The API key can now be specified in a header. (Browsers still don't allow specifying headers for WebSocket connections. But this change makes using HTTP libraries that allow specifying global API key/version headers easy.)
