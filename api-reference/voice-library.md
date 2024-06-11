---
description: Query available voices
---

# Voice Library

{% hint style="info" %}
If you try the API in GitBook, you will need to manually specify the API key in the X-API-Key header field. The authentication pane does not currently work due to a GitBook bug. We're following up on that with them.
{% endhint %}

{% swagger src="../.gitbook/assets/openapi.yml" path="/voices" method="get" %}
[openapi.yml](<../.gitbook/assets/openapi.yml>)
{% endswagger %}

{% swagger src="../.gitbook/assets/openapi.yml" path="/voices" method="post" %}
[openapi.yml](<../.gitbook/assets/openapi.yml>)
{% endswagger %}

{% swagger src="../.gitbook/assets/openapi.yml" path="/voices/{id}" method="get" %}
[openapi.yml](<../.gitbook/assets/openapi.yml>)
{% endswagger %}

{% swagger src="../.gitbook/assets/openapi.yml" path="/voices/{id}" method="delete" %}
[openapi.yml](<../.gitbook/assets/openapi.yml>)
{% endswagger %}
