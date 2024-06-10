# Text-to-Speech

{% hint style="info" %}
If you try the API in GitBook, you will need to manually specify the API key in the X-API-Key header field. The authentication pane does not currently work due to a GitBook bug. We're following up on that with them.
{% endhint %}

{% hint style="warning" %}
Passing an ID currently has twice the latency as passing an embedding directly. We're working on caching IDs to bring down the latency.
{% endhint %}

## Bytes

{% swagger src="../.gitbook/assets/openapi (2).yml" path="/tts/bytes" method="post" %}
[openapi (2).yml](<../.gitbook/assets/openapi (2).yml>)
{% endswagger %}

## Server-Sent Events

{% swagger src="../.gitbook/assets/openapi.yml" path="/tts/sse" method="post" %}
[openapi.yml](../.gitbook/assets/openapi.yml)
{% endswagger %}

## WebSocket

{% hint style="info" %}
You can try out WebSockets using `wscat`. If you have Node installed, just run:

`npx wscat -c "wss://api.cartesia.ai/v0/tts/websocket?api_key=<YOUR_API_KEY>"`
{% endhint %}

<mark style="color:green;">`GET`</mark> `/v0/tts/websocket?api_key=<YOUR_API_KEY>`

Initiate a bidirectional WebSocket connection.

**Query Parameters**

| Name      | Value            |
| --------- | ---------------- |
| `api_key` | `<YOUR_API_KEY>` |

**WebSocket Request**

Send a JSON-encoded message on the WebSocket. The schema of said message should be identical to the Server-Sent Events request body, except that you must additionally specify a `context_id` field containing a unique identifier for the request. (You can use a UUIDv4 or a [human ID](https://www.npmjs.com/package/human-id).)

**Responses**

After you send a message body on the WebSocket, the API will respond with a series of  JSON chunks with the same schema as the data in Server-Sent Events responses.

