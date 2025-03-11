---
title: Specify Custom Pronunciations
subtitle: >-
  Learn how to specify custom pronunciations for words that are hard to get right, like proper nouns or domain-specific terms.
---

All models in the Sonic TTS family support custom pronunciations in your transcripts.

`sonic-2` and `sonic-turbo` use MFA-style IPA for all languages.
For the best controllability around pronunciation, we recommend using `sonic-2`.

You can also get custom pronunciations with older Sonic models.
The `sonic`, `sonic-2024-12-12`, and `sonic-2024-10-19` models use Sonic-flavored IPA phonemes for English.
The `sonic` and `sonic-2024-12-12` use MFA-style IPA for languages other than English, and the Sonic Preview model uses MFA-style IPA for all languages.
Note that `sonic-2024-10-19` does not support custom pronunciations for languages other than English.
We will soon be updating all models to use MFA-style IPA.

Custom words should be wrapped in double angle brackets `<<` `>>` , with pipe characters `|` between phonemes and no whitespace.
For example: 
- `Can I get <<cʰ|ɛ|tʃ|ə|p>> on that?` (MFA-style IPA)
- `Can I get <<h|ɑː|l|ˈə|p|eɪ|n|y|ˌoʊ|>> on that?` (Sonic-flavored IPA)

Each individual word should be wrapped in it’s own set of angle brackets.

# MFA-style IPA

## Constructing Pronunciations

We use the IPA phoneset as defined by the [Montreal Forced Aligner](https://montreal-forced-aligner.readthedocs.io/en/latest/). Because of the size and complexity of this phoneset, you may find it easier to construct your custom pronunciation starting from existing words with known phonemizations. We suggest the following workflow for constructing a custom pronunciation for a word:

1. Go to the [MFA pronunciation dictionary index](https://mfa-models.readthedocs.io/en/latest/dictionary/index.html) and find the page corresponding to your language. Make sure the phoneset is MFA, and try to download the latest version (for most languages, v3.0 or v3.1).
    1. This page will give you the full range of acceptable phones for your language under the “phones” section.
2. Scroll down to the `Installation` section and click on the `Download from the release page` link.
3. Scroll to the bottom of the release page and download the .dict file; this is a text file mapping words to their constituent phonemes.
    1. The first column in the file contains words, and the last column contains space delimited phonemes. Ignore the other columns.
4. Look up your word or words that sound similar to your intended pronunciation in the dictionary. Use these pronunciations as a starting point to construct your custom pronunciation.

Automatic pronunciation suggestions based on audio samples will be added in a future update. Note that MFA-style IPA does not support stress markers.

## Example

Suppose I want to generate the text “This is a generation from Cartesia” and the model is not pronouncing “Cartesia” correctly. I would do the following:

1. Go to the [MFA pronunciation dictionary index](https://mfa-models.readthedocs.io/en/latest/dictionary/index.html) and look for English pronunciation dictionaries. I see that for US English, the most recent version is v3.1.
    1. I note that the page says that the acceptable phones for US english are `aj aw b bʲ c cʰ cʷ d dʒ dʲ d̪ ej f fʲ h i iː j k kʰ kʷ l m mʲ m̩ n n̩ ow p pʰ pʲ pʷ s t tʃ tʰ tʲ tʷ t̪ v vʲ w z æ ç ð ŋ ɐ ɑ ɑː ɒ ɒː ɔj ə ɚ ɛ ɝ ɟ ɟʷ ɡ ɡʷ ɪ ɫ ɫ̩ ɱ ɲ ɹ ɾ ɾʲ ɾ̃ ʃ ʉ ʉː ʊ ʎ ʒ ʔ θ`
2. Download the .dict file from the bottom of the [release page](https://github.com/MontrealCorpusTools/mfa-models/releases/tag/dictionary-english_us_mfa-v3.1.0). 
3. Find a word in this dictionary that sounds similar to how I want “Cartesia” to be pronounced. I see this entry in the dictionary: 
    
    `cartesian	0.99	0.14	1.0	1.0	kʰ ɑ ɹ tʲ i ʒ ə n`
    
4. Ignore the middle four numeric columns. I want to cut off the part of the pronunciation that corresponds to “-an” and replace it with an “uh” sound. I know that the MFA phoneme for “uh” is `ɐ` (if I didn’t know that, I could also look up “uh” in the dictionary). So the pronunciation I want is `kʰ ɑ ɹ tʲ i ʒ ɐ`.
5. Format the phonemes it in angle brackets with pipe characters between phonemes and no whitespace. So my transcript is `This is a generation from <<kʰ|ɑ|ɹ|tʲ|i|ʒ|ɐ>>`.


# Sonic-flavored IPA

Here is a pronunciation guide for Sonic-flavored IPA.
It follows the [English phonology article on Wikipedia](https://en.wikipedia.org/wiki/English\_phonology) for most phonemes,
but in spots where our model requires different notation than you may expect, we've included a blue `<=` in the margins.

You can copy/paste some of these uncommon symbols from the original [charts here](https://docs.google.com/spreadsheets/d/1OJbiKtxLyodpNPqVfOu43X2HloLsAixTtFppEuQ\_4pI/edit?usp=sharing).

![](/assets/images/sonic_ipa_guide.png)

## Stresses and vowel length markers

Sonic English requires stress markers for first (`ˈ`) and second (`ˌ`) stressed syllables, which go directly before the vowel. We also use annotations for vowel length (`ː`). The model can also operate without them, but you will have noticeably better robustness and control when using them.

