---
description: Audio generation endpoint
---

# Text-to-Speech

## Server-Sent Events

{% swagger src="../.gitbook/assets/openapi.yaml" path="/v0/audio/sse" method="post" %}
[openapi.yaml](../.gitbook/assets/openapi.yaml)
{% endswagger %}

## WebSocket

<mark style="color:green;">`GET`</mark> `/v0/audio/websocket?api_key=<YOUR_API_KEY>`

Initiate a bidirectional WebSocket connection.

**Query Params**

| Name     | Value            |
| -------- | ---------------- |
| api\_key | `<YOUR_API_KEY>` |

**WebSocket Message Body**

Send a JSON-encoded message on the WebSocket of the following shape:

| Name                      | Type                    | Description                                                                                                   |
| ------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------- |
| `data` (see fields below) | object                  | Request data                                                                                                  |
| `data.model_id`           | string                  | ID of the model to generate with, e.g. `upbeat-moon` for Sonic Turbo English                                  |
| `data.transcript`         | string                  | Transcript to speak                                                                                           |
| `data.voice`              | number\[] of length 192 | Embedding for the voice you want to generate with. You can use any vector of length 192 for testing purposes. |
| `context_id`              | string                  | unique ID for this request. You can generate this however you like, but it should be unique for each request  |

**WebSocket Response Message**

After you send a message body on the WebSocket, the API will respond with a series of chunks of the following shape:

| Name                      | Type    | Description                                                                                |
| ------------------------- | ------- | ------------------------------------------------------------------------------------------ |
| `data` (see fields below) | string  | Base 64-encoded raw 32-bit PCM audio (float32's from -1 to 1). Sampling rate is 44.1 kHz.  |
| `done`                    | boolean | Whether the stream is complete; the message with `done === true` will not contain any data |
| `context_id`              | string  | ID for the request this chunk corresponds to.                                              |

