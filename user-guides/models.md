# Models

<table data-view="cards"><thead><tr><th>Model ID</th><th>Name</th></tr></thead><tbody><tr><td><code>upbeat-moon</code></td><td>Sonic Turbo English</td></tr></tbody></table>

## Sonic Turbo English

_Sonic Turbo English_ is our first and latest English text-to-speech model. It demonstrates strong overall capabilities and is optimized for efficiency to achieve low latency.

**Model ID:** `upbeat-moon`

**Release date:** May 2024

**Supported languages:** English

**Capabilities:**

* Supports abbreviations, acronyms, initialisms and phonemes (alpha).&#x20;
* Supports numbers, dates, phone numbers and SSNs.

**Known issues:**

* Audio generations can loop or diverge on transcripts that have repeated words in succession.
* Audio generations may occasionally sound fast.
* Some long numbers and phone numbers may sound rushed as well.

### Parameters

<table><thead><tr><th width="164">Name</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>transcript</td><td>string (required)</td><td><p>Speech transcript. </p><p>Min length: 1 characters</p><p>Max length: 500 characters</p></td></tr><tr><td>voice</td><td>list of floats (optional)</td><td>Voice embedding to generate with. <br>You can get one from the "List voices" endpoint.<br>Default: null</td></tr><tr><td></td><td></td><td></td></tr></tbody></table>
