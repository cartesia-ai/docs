# Stream audio

Given a transcript and model\_id, this endpoint returns a JSON containing a "data" parameter which contains 32-bit float PCM data encoded as base64.

{% hint style="info" %}
**What's 32-bit float PCM data?** Our models generate audio as 32-bit floats ranging from -1 to 1. We encode these floats as base64 strings in our APIs for efficiency. You can decode these into floats in your language and play them with any library that supports "raw" PCM audio, such as pyaudio for Python.
{% endhint %}

{% swagger src="../.gitbook/assets/openapi.json" path="/v0/audio/stream" method="post" %}
[openapi.json](../.gitbook/assets/openapi.json)
{% endswagger %}
