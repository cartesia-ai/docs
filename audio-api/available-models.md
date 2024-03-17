# Available models

<table data-view="cards"><thead><tr><th>Model ID</th><th>Name</th></tr></thead><tbody><tr><td><code>genial-planet-1346</code></td><td>Genial Planet</td></tr></tbody></table>

## Genial Planet

**Model ID:** `genial-planet-1346`

Supports fast generation (\~50ms to generate 100ms of audio).

### Parameters

| Name       | Type                      | Description                                                                        |
| ---------- | ------------------------- | ---------------------------------------------------------------------------------- |
| transcript | string                    | Speech transcript                                                                  |
| voice      | list of floats (optional) | Voice embedding to generate with. You can get one from the "List voices" endpoint. |

### **Known issues**

* Word errors on transcripts longer than a few sentences.
