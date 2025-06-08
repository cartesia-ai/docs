---
title: Contexts
---

<Info>
This is a hands-on guide to input streaming using WebSocket contexts. For a conceptual overview of how input streaming works in Sonic, see the [input streaming guide](/build-with-cartesia/capability-guides/stream-inputs-using-continuations).
</Info>

> In many real time use cases, you don't have your transcripts available upfront—like when you're generating them using an LLM. For these cases, Sonic supports input streaming.

The context IDs you pass to the Cartesia API identify speech contexts. Contexts maintain prosody between their inputs—so you can send a transcript in multiple parts and receive seamless speech in return.

To stream in inputs on a context, just pass a `continue` flag (set to `true`) for every input that you expect will be followed by more inputs. (By default, this flag is set to `false`.)

To finish a context, just set `continue` to `false`. If you do not know the last transcript in advance, you can send an input with an empty transcript and `continue` set to `false`.

<Note>Contexts automatically expire 1 second after the last audio output is streamed out. Attempting to send another input on the same context ID after expiry is not supported.</Note>

<ParamField body="continue" type="boolean" default={false}>
    Whether this input may be followed by more inputs.
</ParamField>

### Input Format

1. Inputs on the same context must keep all fields except `transcript`, `continue`, and `duration` the same.
2. Transcripts are concatenated verbatim, so make sure they form a valid transcript when joined together. Make sure to include any spaces between words or punctuations as necessary. For example, in languages with spaces, you should include a space at the end of the preceding transcript, e.g. transcript 1 is `Thanks for coming, ` and transcript 2 is `it was great to see you.`

### Example

Let's say you're trying to generate speech for "Hello, Sonic! I'm streaming inputs." You should stream in the following inputs (repeated fields omitted for brevity). Note: all other fields (e.g. `model_id`, `language`) are required and should be passed unchanged between requests with input streaming.

```json Input Streaming
{"transcript": "Hello, Sonic!", "continue": true, "context_id": "happy-monkeys-fly"}
{"transcript": " I'm streaming ", "continue": true, "context_id": "happy-monkeys-fly"}
{"transcript": "inputs.", "continue": false, "context_id": "happy-monkeys-fly"}
```

<Tip>
If [streaming in input tokens](/build-with-cartesia/capability-guides/stream-inputs-using-continuations), we recommend using `max_buffer_delay_ms`, which sets the maximum time the model will buffer text before starting generation.

Without this option set, the model will start generating immediately on the first request, giving you full control over buffering of inputs.
</Tip>

If you don't know the last transcript in advance, you can send an input with an empty transcript and `continue` set to `false`:

```json Input Streaming
{"transcript": "Hello, Sonic!", "continue": true, "context_id": "happy-monkeys-fly"}
{"transcript": " I'm streaming ", "continue": true, "context_id": "happy-monkeys-fly"}
{"transcript": "inputs.", "continue": true, "context_id": "happy-monkeys-fly"}
{"transcript": "", "continue": false, "context_id": "happy-monkeys-fly"}
```

### Output

You will only receive `done: true` after outputs for the entire context have been returned.

Outputs for a given context will always be in order of the inputs you streamed in. (That is, if you send input A and then input B on a context, you will first receive the chunks corresponding to input A, and then the chunks corresponding to input B.)

## Cancelling Requests
You may also cancel outgoing requests through the websocket.

To cancel a request, send a JSON message with the following structure:

```json WebSocket Request
{
  "context_id": "happy-monkeys-fly",
  "cancel": true
}
```

When you send a cancel request:

1. It will only halt requests that have not begun generating a response yet.
2. Any currently generating request will continue sending responses until completion.

<Note>
The `context_id` in the cancel request should match the `context_id` of the request you want to cancel.
</Note>
