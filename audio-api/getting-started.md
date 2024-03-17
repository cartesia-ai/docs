---
description: >-
  The Cartesia Audio API provides real-time text-to-speech and instant voice
  cloning.
---

# Getting started

To get started with the API, the first thing you’ll need is an API key. You can get one by logging into the playground at [play.cartesia.ai](https://play.cartesia.ai).

{% hint style="info" %}
You can use the playground to generate speech, clone your voice from a 10 second sound clip, or explore the default voices we offer.
{% endhint %}

To generate your first words, run this command in your terminal, replacing `YOUR_API_KEY`:

{% code overflow="wrap" %}
```bash
curl -i -X POST "https://api.cartesia.ai/v0/audio/stream" -H "Content-Type: application/json" -H "X-API-Key: YOUR_API_KEY" -d '{"transcript": "Hello World! My name is Cartesia.", "model_id": "genial-planet-1346"}'
```
{% endcode %}

This calls the [stream-audio.md](stream-audio.md "mention") endpoint and outputs a JSON containing 32-bit float PCM audio in the `data` key.
