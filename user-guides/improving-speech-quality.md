---
description: >-
  This guide provides some tips and tricks to improve the quality of generated
  speech.
---

# Improving Speech Quality

{% hint style="warning" %}
The tricks shown below are specific to the current model ID (`upbeat-moon`) and may change in the future as we improve our modeling and training procedure.
{% endhint %}

## Text-to-speech

Here are a few guidelines to achieve the best performance:

* Add punctuation at the end of each transcript whenever possible.
* Enter dates in MM/DD/YYYY form, such as 04/20/2023.

## Voice cloning

1. **Choose an appropriate transcript to read aloud.** You want the transcript you read aloud to align as closely as possible with the voice you want to generate. For example, don't read a colorless transcript in a monotone voice unless you're aiming for a monotonous clone. Instead, prepare a transcript that is suited to your use case and has the right energy.
2. **Speak as clearly as possible and avoid background noise.**
3. **Limit your recording to 10 to 20 seconds.** This is the sweet spot for cloning quality—a longer recording will not help.
