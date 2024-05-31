# Using the API

{% hint style="success" %}
**The API is currently v0 and is subject to change.** To ensure simple upgrades, we strongly recommend taking advantage of our client libraries.
{% endhint %}

## Quickstart

To get started with the API, the first thing you’ll need is an API key. You can get one by logging into the playground and heading to "Console" at [play.cartesia.ai/console](https://play.cartesia.ai/console).

To generate your first words, run this command in your terminal, replacing `YOUR_API_KEY`:

{% code overflow="wrap" %}
```bash
curl -i -N -X POST "https://api.cartesia.ai/v0/audio/sse" -H "X-API-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"transcript": "Hello World! My name is Cartesia.", "model_id": "upbeat-moon", "voice": [0.10524034,0.036516823,0.08379461,-0.0008536052,-0.030912986,0.12763357,0.035265494,0.051463086,-0.14874107,0.08530694,-0.002666726,0.07297309,0.019096784,0.052431844,0.0019880654,-0.081137374,-0.04133976,0.012448823,0.094353974,-0.15502396,0.17556168,-0.016467419,-0.1071745,0.13175344,-0.022903686,0.10742437,0.019934922,-0.06545218,-0.06414428,-0.16530125,0.0064731776,-0.021217234,-0.00085768464,0.00011085053,-0.02334162,0.08068573,-0.07263501,0.013672663,0.06694877,0.06821649,-0.020699661,0.055973656,0.085257694,0.016610654,-0.0719807,-0.08541163,0.04399785,-0.15496898,-0.029270595,-0.04526015,0.10471187,0.10386201,-0.016651833,0.073091775,0.02018194,0.01805716,0.09070067,-0.06742347,0.0043610507,0.05342529,-0.11835528,-0.14587244,0.043436855,0.04056294,-0.029465329,0.039710104,0.10268669,0.015919376,-0.07867825,0.26217216,0.067276746,-0.0658388,-0.0087163355,0.21219166,0.018791754,0.0351091,0.053658996,-0.028242748,-0.054346297,-0.04304397,0.08727209,-0.07323659,-0.0026997935,-0.07639795,-0.09074672,0.009193541,-0.008581618,-0.00991375,0.07279599,0.08648909,0.054638315,-0.038665026,-0.111700945,0.02125478,-0.16177021,-0.018422322,0.004991134,0.012886459,-0.0687685,0.020180603,0.057892803,0.018106582,-0.07973107,-0.000906125,0.08395246,-0.006492026,0.066874415,-0.00057541585,0.03213199,0.089684755,0.03864614,0.07406645,0.0125942305,-0.020572936,0.057794824,0.020129846,-0.03784049,-0.055392563,0.066848285,-0.10005552,0.011906698,-0.010718932,0.097021565,0.035597388,0.10532967,-0.020827781,-0.056140043,-0.108077444,0.08420555,-0.0008438316,0.1191433,-0.08149342,0.047034085,0.03372324,-0.06637179,0.019952752,-0.084601626,-0.06532088,0.078291185,0.030400032,-0.012597609,0.10552426,0.05080604,-0.13780367,0.06388313,0.057912324,-0.055785883,-0.09924558,-0.024003623,0.051238224,0.053676255,-0.031032093,0.000245127,-0.017655622,0.033001196,-0.043401588,-0.033300664,-0.036218338,-0.07647873,-0.057232864,0.04530946,0.011687513,-0.09498464,0.022615839,-0.090504795,0.07060739,-0.005542068,-0.017781602,0.056733254,-0.09394165,-0.031787034,0.046881177,-0.038988,-0.00040113737,0.036516517,-0.06187285,-0.048517726,0.03323435,-0.050069597,0.06782466,0.17804964,-0.03509199,0.056292336,0.026197381,-0.08660235,-0.11322905,0.06624886,-0.074095465,0.10009627,-0.066993296,-0.052724812,0.058329698]}'
```
{% endcode %}

This command calls the [text-to-speech.md](../api-reference/text-to-speech.md "mention") endpoint which runs the text-to-speech generation and transmits the output in chunks.  Each chunk is a JSON string containing a chunk of audio data and its associated metadata.

{% hint style="info" %}
See [text-to-speech.md](../api-reference/text-to-speech.md "mention") for an exhaustive enumeration of the fields returned by the API.
{% endhint %}

{% hint style="info" %}
The voice embedding used in this example can be found in the Voices tab of the playground at [https://play.cartesia.ai/voices/79f8b5fb-2cc8-479a-80df-29f7a7cf1a3e](https://play.cartesia.ai/voices/79f8b5fb-2cc8-479a-80df-29f7a7cf1a3e)
{% endhint %}

## API Conventions

All API requests use the following base URL: `https://api.cartesia.ai/<VERSION>`. The current API version is `v0`.

{% hint style="danger" %}
All endpoints use HTTPS. HTTP is not supported. API keys that call the API over HTTP may be subject to deletion.
{% endhint %}

### Authentication

Authentication is handled using API keys. You can create a new API key from [play.cartesia.ai/console](https://play.cartesia.ai/console).

* For HTTP requests, authentication is handled by adding the field `X-API-Key: <your_api_key>` into the HTTP headers.
* For WebSocket connections, authentication is handled by passing in the field `?api_key=<your_api_key>` when creating the WebSocket connection.&#x20;

### Response codes

Our API uses standard HTTP response codes; refer to [httpstatuses.io](https://httpstatuses.io).

### Passing data

All GET requests use query parameters to pass data. All POST requests use a JSON body or `multipart/form-data`.

