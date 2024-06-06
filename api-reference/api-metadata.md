# API Metadata

For debugging purposes, we provide an endpoint that you can query to check your connection to the server and retrieve the current API version.

{% hint style="info" %}
If you try the API in GitBook, you will need to manually specify the API key in the X-API-Key header field. The authentication pane does not currently work due to a GitBook bug. We're following up on that with them.
{% endhint %}

{% swagger src="../.gitbook/assets/cartesiaapi (1).yaml" path="/" method="get" %}
[cartesiaapi (1).yaml](<../.gitbook/assets/cartesiaapi (1).yaml>)
{% endswagger %}
