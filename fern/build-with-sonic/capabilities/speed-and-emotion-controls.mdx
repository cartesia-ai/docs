---
title: Control Speed and Emotion
subtitle: >-
  Learn how to control the speed and emotion of generated speech.
---

<Warning>
This feature has been deprecated. Please see [the changelog](/developer-tools/changelog) for details.
</Warning>

Speed and emotion controls are available through the [playground](https://play.cartesia.ai) and the API in the Text to Speech endpoints ([Bytes](/api-reference/tts/bytes), [SSE](/api-reference/tts/sse), and [WebSocket](/api-reference/tts/tts)).

<Note>
**The effects of controls vary by voice and transcript.** If you find that the controls cause artifacts in the generated speech, try reducing their strength or reducing the number of controls you have applied.
</Note>

## Playground

In the playground, you can access speed and emotion controls by clicking the "Speed/Emotion" button in the Text to Speech tab.

<Frame background="subtle">
  <img src="/assets/images/speed-emotion-pg.png" />
</Frame>

## API

<Warning>
This feature is currently experimental and is subject to breaking changes.
</Warning>

To use controls in the API, add the `__experimental_controls` dictionary to the `voice` object in your API request:

```json
"voice": {
  "mode": "id",
  "id": "VOICE_ID",
  "__experimental_controls": {
    "speed": "normal",
    "emotion": [
      "positivity:high",
      "curiosity"
    ]
  }
}
```

### Speed Options

- `"slowest"`: Very slow speech
- `"slow"`: Slower than normal speech
- `"normal"`: Default speech rate
- `"fast"`: Faster than normal speech
- `"fastest"`: Very fast speech

For more granular control, you can define speed as a number within the range $[-1.0, 1.0]$. A value of 0 represents the default speed, while negative values slow down the speech and positive values speed it up.

<Tabs>
<Tab title="Using a label">
```json
"__experimental_controls": {
  "speed": "fast"
}
```
</Tab>

<Tab title="Using a number">
```json
"__experimental_controls": {
  "speed": -0.1
}
```
</Tab>
</Tabs>

### Emotion Options

The `emotion` parameter is an array of "tags" in the form `emotion_name:level`. For example, `positivity:high` or `curiosity`.

#### Emotion Names

- `anger`
- `positivity`
- `surprise`
- `sadness`
- `curiosity`

#### Emotion Levels

<Note>
**Emotion controls are purely additive, they cannot reduce or remove emotions.** For example, `anger:low` will add a small amount of anger to the voice, not make the voice less angry.
</Note>

- `lowest`
- `low`
- (omit level for moderate addition of the emotion)
- `high`
- `highest`
