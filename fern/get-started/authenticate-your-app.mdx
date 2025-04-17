---
title: Authenticate your client apps
subtitle: Secure client access to Cartesia APIs using Access Tokens
---

You may want to make Cartesia API requests directly from your client application. However, shipping your API key to the app is not secure, as a malicious user could extract your API key and issue API requests billed to your account.

Access Tokens provide a secure way to authenticate client-side requests to Cartesia's APIs without exposing your API key.

## Prerequisites

Before implementing Access Tokens:

1. Configure your server with a Cartesia API key
2. Implement user authentication in your application
3. Establish secure client-server communication

### Available Grants

Currently we only support one grant, `tts`. With `grants: { tts: true }`, clients have access to:

- `/tts/bytes` - Synchronous TTS generation streamed with chunked encoding
- `/tts/sse` - Server-sent events for streaming
- `/tts/websocket` - WebSocket-based streaming

> **Coming Soon**: Additional grants for `/voices`, `/voice-changer`, and other services

## Implementation Guide

### 1. Token Generation (Server-side)

Make a request to generate a new access token:

<Tabs>
  <Tab title="cURL">
  ```bash
  curl --location 'https://api.cartesia.ai/access-token' \
    -H 'Cartesia-Version: 2025-04-16' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer sk_car_...' \
    -d '{ "grants": {"tts": true}, "expires_in": 60}'
  ```
</Tab>
<Tab title="JavaScript">
```javascript
import { CartesiaClient } from "@cartesia/cartesia-js";

const client = new CartesiaClient({ apiKey: "YOUR_API_KEY" });

await client.auth.accessToken({
grants: {
tts: true
},
expiresIn: 60
});

````
</Tab>
<Tab title="Python">
```python
from cartesia import Cartesia

client = Cartesia(
  token="YOUR_API_KEY"
)

response = client.auth.access_token(
  grants={"tts": True}, # Grant TTS permissions
  expires_in=60 # Token expires in 60 seconds
)

# The response will contain the access token

print(f"Access Token: {response.token}")

````

</Tab>
</Tabs>

#### Example Implementation

```typescript
const response = await fetch("https://api.cartesia.ai/access-token", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Cartesia-Version": "2025-04-16",
    Authorization: "Bearer <your_api_key>",
  },
  body: JSON.stringify({
    grants: { tts: true },
    expiresIn: 60, // 1 minute
  }),
});

const { token } = await response.json();
```

For detailed API specifications, see the [Token API Reference](/api-reference/auth/access-token).

### 2. Token Storage (Client-side)

Store the token securely, such as setting HTTP-only cookie with matching token expiration. The cookie should be `httpOnly`, `secure`, and `sameSite: "strict"`.

### 3. Making Authenticated Requests

```typescript
const response = await fetch("https://api.cartesia.ai/tts/bytes", {
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  },
  // ... request configuration
});
```

### 4. Token Refresh Strategy

Proactively refresh the token in your app before they expire.

## Security Best Practices

### Essential Guidelines

- ✅ Generate tokens server-side only
- ✅ Use short token lifetimes (minutes)
- ✅ Implement automatic token refresh
- ✅ Store tokens in HTTP-only cookies
- ✅ Enable secure and SameSite cookie flags

### Security Don'ts

- ❌ Never store tokens in localStorage/sessionStorage
- ❌ Never log tokens or display them in the UI
- ❌ Never transmit tokens over non-HTTPS connections

### Token Lifecycle Management

1. Generate new token upon user authentication
2. Implement automatic refresh before expiration
3. Handle token expiration gracefully

## Additional Resources

- [API Reference](/api-reference/auth/access-token) - Access Token generation endpoint documentation
