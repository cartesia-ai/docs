---
title: Stream Inputs using Continuations
subtitle: Learn how to stream input text to Sonic TTS.
---

In many real-time use cases, you don't have input text available upfront—like when you're generating it on the fly using a language model. For these cases, Sonic-2 supports input streaming through a feature we call _continuations_.

<Info>
This guide will cover how input streaming works from the perspective of the Sonic-2 model. If you just want to implement input streaming, see [the WebSocket API reference](/api-reference/tts/tts), which implements continuations using _contexts_.
</Info>

## Continuations

Continuations are generations that extend already generated speech. They're called continuations because you're continuing the generation from where the last one left off, maintaining the _prosody_ of the previous generation.

If you don't use continuations, you get sudden changes in prosody that create seams in the audio.

<Note>
Prosody refers to the rhythm, intonation, and stress in speech. It's what makes speech flow naturally and sound human-like.
</Note>

Let's say we're using an LLM and it generates a transcript in three parts, with a one second delay between each part:

1. `Hello, my name is Sonic.`
2. ` It's very nice`
3. ` to meet you.`

To generate speech for the whole transcript, we might think to generate speech for each part independently and stitch the audios together:

<Frame caption="Figure 1: Generate transcripts independently & stitch them together." background="subtle">
    <img src="/assets/images/concepts_continuations_without_continuations.png" alt="no_continuations" />
</Frame>

Unfortunately, we end up with speech that has sudden changes in prosody and strange pacing:

<audio controls src="https://cartesia-docs-public.s3.us-east-2.amazonaws.com/concepts/continuations/without_continuations.wav">
  Your browser does not support the audio element.
</audio>

Now, let's try the same transcripts, but using continuations. The setup looks like this:

<Frame caption="Figure 2: Generate transcripts using continuations." background="subtle">
    <img src="/assets/images/concepts_continuations_with_continuations.png" alt="continuations" />
</Frame>

Here's what we get:

<audio controls src="https://cartesia-docs-public.s3.us-east-2.amazonaws.com/concepts/continuations/with_continuations.wav">
  Your browser does not support the audio element.
</audio>

As you can hear, this output sounds seamless and natural.

<Check>
You can scale up continuations to any number of inputs. There is no limit.
</Check>

## Caveat: Streamed inputs should form a valid transcript when joined

This means that `Hello, world!` can be followed by ` How are you?` (note the leading space) but not `How are you?`, since when joined they form the invalid transcript `Hello, world!How are you?`.

In practice, this means you should maintain spacing and punctuation in your streamed inputs.

## Automatic buffering with `max_buffer_delay_ms`

When streaming inputs from LLMs word-by-word or token-by-token, we strongly recommend using the `max_buffer_delay_ms` parameter. This parameter sets the maximum time (in milliseconds) the model will wait and buffer text before starting generation.

### How it works

When set, the model will buffer incoming text chunks until it's confident it has enough context to generate high-quality speech, or the buffer delay elapses, whichever comes first.

Without this parameter (or when set to 0), the model immediately starts generating with each input, which can result in choppy audio or unnatural prosody when inputs are very small (like single words or tokens).

### Configuration

- **Range**: Values between 0-1000ms are supported
- **Default**: 0 (no buffering)

Use this to balance responsiveness with higher quality speech generation, which often benefits from having more context.

```js
// Example WebSocket request with `max_buffer_delay_ms`
{
  "model_id": "sonic-2",
  "transcript": "Hello",  // First word/token
  "voice": {
    "mode": "id",
    "id": "a0e99841-438c-4a64-b679-ae501e7d6091"
  },
  "context_id": "my-conversation-123",
  "continue": true,
  "max_buffer_delay_ms": 1000  // Buffer up to 1000ms
}
```

Let's try the following transcripts with continuations and `max_buffer_delay_ms=500`: `['Hello', 'my name', 'is Sonic.', "It's ", 'very ', 'nice ', 'to ', 'meet ', 'you.']`

<audio controls src="https://cartesia-docs-public.s3.us-east-2.amazonaws.com/concepts/continuations/with_continuations_many_inputs.wav">
  Your browser does not support the audio element.
</audio>
