---
title: Embeddings and Voice Mixing
subtitle: Learn how Sonic uses embeddings to represent voices and enable voice mixing.
---

<Note>
You don't need to understand embeddings to use Voice Mixing, which is available in the [playground](https://play.cartesia.ai) and the [API](/api-reference/voices/mix).
</Note>

Cartesia models represent voices in the form of _embeddings_. An embedding is a length-192 vector of floats between -1 and 1. Collectively, these numbers capture the characteristics of the voice: speed, emotion, accent, and so on.

Our text-to-speech endpoints currently require embeddings to be specified for each generation. Support for specifying voice IDs instead of embeddings is planned.

## Voice Mixing [Alpha]

A neat feature that embeddings enable is _voice mixing_. You can interpolate two embeddings to obtain a third voice that sounds somewhere between both of them. This feature is available in [the playground](https://play.cartesia.ai).

We suggest using linear interpolation to interpolate between embeddings. To interpolate between embeddings $$A$$ and $$B$$ to obtain $$C$$, use the following formula:

$$C = (1-\alpha )A + \alpha B$$

$$\alpha$$, or alpha, is the “interpolation coefficient”—an alpha of 1 means $$C = B$$ and an alpha of 0 means $$C = A$$. For example, with $$\alpha=0.5$$, $$C=0.5A+0.5B.$$

<Note>
The perception of a mixed voice does not change linearly with the interpolation coefficient. For instance, to get a 50/50 perceived mix, you may need to lean towards one of the voices. To get the best performance, do a little exploration.
</Note>

### Prototype embeddings

Our playground's voice design features (i.e. the speed and emotion controls) rely on _prototype embeddings_. These are embeddings that capture the essence of some characteristic: fastness, slowness, anger, curiosity, and so on. If you interpolate a voice with a prototype embedding, it will acquire the characteristics of the prototype embedding.

<Note>
The current voice design sliders (speed, emotion) may alter the speaker identity. Making smaller changes should help with this, but we're working on improving the stability of this feature!
</Note>
