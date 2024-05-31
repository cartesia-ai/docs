---
description: >-
  Our Sonic TTS model supports inserting phonetic transcriptions for words that
  are hard to get right, like proper nouns or domain-specific terms. Here's a
  guide to crafting pronunciations for Sonic :)
---

# Custom Pronunciation Guide

## How to insert phones:

When using Sonic (whether through playground, API, or client library) you can simply add phones directly in the transcript - just wrap them in `<<>>` and separate each phoneme with a pipe `|`.

## Sonic-flavored IPA

We use IPA, but our model currently only does well when using the flavor of IPA it was trained with. To assist, we've compiled a pronunciation guide.

Notice - our model follows [Wikipedia](https://en.wikipedia.org/wiki/English\_phonology) style for most phones, but in spots where our model requires different notation than you may expect, we've included a blue <mark style="color:blue;">`<=`</mark> in the margins.

You can copy/paste some of these uncommon symbols from the original [charts here](https://docs.google.com/spreadsheets/d/1OJbiKtxLyodpNPqVfOu43X2HloLsAixTtFppEuQ\_4pI/edit?usp=sharing) :)

<figure><img src="../.gitbook/assets/sonic_ipa_guide.png" alt=""><figcaption><p>Examples can be helpful when transcribing phones for a new word</p></figcaption></figure>

## # Stresses and vowel length markers.

Our model was trained with stress markers for first (`ˈ`) and second (`ˌ`) stressed syllables. These are somewhat optional, but you might have better robustness using them. We also use annotations for vowel length (`ː`), and these will also slightly stabilize generations.

## Usage example

Some of our voices (ie Maria) pronounce "jalapeño" correctly, but some (ie Wizardman) don't.

Instead of using `"transcript": "Can I get jalapeño on that?"`

Try using: `"transcript": "Can I get <<h|ɑː|l|ˈə|p|eɪ|n|y|ˌoʊ|>> on that?`

