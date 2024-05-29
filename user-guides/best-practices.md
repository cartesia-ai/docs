---
description: This guide provides some tips and tricks to improve audio generation quality.
---

# Best practices

{% hint style="warning" %}
Disclaimer: The tricks shown below are specific to the current model `upbeat-moon`and may change in the future as we improve our modeling and training procedure.&#x20;
{% endhint %}

## Text-to-speech

Here are a few guidelines to achieve the best performance on the `upbeat-moon` model:

* add a period at the end of each transcript whenever possible.
* format phone numbers with a space/dash between each set. For example try to go for _"574-835-848_8" or "_574 835 8488"_ instead of _5748358488_.
* For best readability, enter dates in the format _MM/DD/YYYY_ like _04/20/2023_.

### Phonemes (alpha)

Our model `upbeat-moon` supports the insertion of phonemes although its support is experimental for now.

* Phonemes should be surrounded with two angle brackets `<< >>` and be entered in IPA format. Here are some examples: `I want to try to <<lid>> them but they don't want to be <<lɛd>>.`
* You can reference [dictionary.com](http://dictionary.com/) for common words or an [IPA phone chart](https://en.wikipedia.org/wiki/International\_Phonetic\_Alphabet\_chart) to craft your own.

## Voice mixing

The perception of a mixed voice does not change linearly with the mixing coefficient. To get best performance, try different combinations and do a little exploration - to get a 50/50 perceived mix, sometimes you need to go stronger towards one of the voices.

## Voice cloning

For best voice cloning results,&#x20;

* Try to speak as clearly as possible, be as expressive as you can and enunciate properly.&#x20;
* Choose a prompt that will align with the voice that you are trying to capture - it's better not to read a colorless prompt in a monotone voice unless your goal is to get a monotonic voice. Instead, prepare a practice script that is suited to your use case and has the appropriate energy / animation.
* Keep your recording to around 10-20 seconds maximum - capturing longer duration clips will not help.
