---
title: Make an API request
subtitle: Generate your first words and learn API conventions
---

## Prerequisites

1. A [Cartesia account](https://play.cartesia.ai).
2. An [API key](https://play.cartesia.ai/keys).
3. [FFmpeg](https://ffmpeg.org/download.html) installed (optional but recommended).

FFmpeg isn't required to use the Cartesia API, but it's useful for saving, playing, and converting audio files, so we will use it in the examples below. You can install it using your platform's package manager:

```sh
# macOS
brew install ffmpeg

# Debian/Ubuntu
sudo apt install ffmpeg

# Fedora
dnf install ffmpeg

# Arch Linux
sudo pacman -S ffmpeg
```

## Generate your first words

<Tabs>

<Tab title="cURL">
To generate your first words, run this command in your terminal, replacing `YOUR_API_KEY`:

```bash
curl -N -X POST "https://api.cartesia.ai/tts/bytes" \
        -H "Cartesia-Version: 2025-04-16" \
        -H "Authorization: Bearer YOUR_API_KEY" \
        -H "Content-Type: application/json" \
        -d '{"transcript": "Welcome to Cartesia Sonic!", "model_id": "sonic-2", "voice": {"mode":"id", "id": "694f9389-aac1-45b6-b726-9d9369183238"}, "output_format":{"container":"wav", "encoding":"pcm_f32le", "sample_rate":44100}}' > sonic-2.wav
```

<Warning>
  Make sure to replace `YOUR_API_KEY` with your real API key, or the command
  won’t output anything!
</Warning>

You can play the resulting `sonic-2.wav` file with `afplay sonic-2.wav` (on macOS) or `ffplay sonic-2.wav` (on any system with FFmpeg installed). You can also just double click it in your file explorer.

This command calls the [Text to Speech (Bytes)](/api-reference/tts/bytes) endpoint which runs the text-to-speech generation and transmits the output in raw bytes.

<Info>
The bytes endpoint supports a variety of output formats, making it perfect for batch use cases where you want to save the audio in advance.

In comparison, Cartesia's WebSocket and Server-Sent Events endpoints stream out raw PCM audio to avoid latency overhead from transcoding the audio.

</Info>

</Tab>

<Tab title="Python">
<Steps>
### Install the SDK

```sh
pip install cartesia

# Or, if you're using uv
uv add cartesia
```

### Make the API call

```python
import os
import subprocess
from cartesia import Cartesia

if os.environ.get("CARTESIA_API_KEY") is None:
    raise ValueError("CARTESIA_API_KEY is not set")

client = Cartesia(api_key=os.environ.get("CARTESIA_API_KEY"))

data = client.tts.bytes(
    model_id="sonic-2",
    transcript="Hello, world! I'm generating audio on Cartesia.",
    voice_id="694f9389-aac1-45b6-b726-9d9369183238",  # Barbershop Man
    # You can find the supported `output_format`s at https://docs.cartesia.ai/api-reference/tts/bytes
    output_format={
        "container": "wav",
        "encoding": "pcm_f32le",
        "sample_rate": 44100,
    },
)

with open("sonic-2.wav", "wb") as f:
    f.write(data)

# Play the file
subprocess.run(["ffplay", "-autoexit", "-nodisp", "sonic-2.wav"])
```

### Run the script

```sh
env CARTESIA_API_KEY=YOUR_API_KEY python cartesia.py

# Or, if you're using uv
env CARTESIA_API_KEY=YOUR_API_KEY uv run cartesia.py
```

</Steps>
</Tab>

<Tab title="JavaScript/TypeScript">

<Steps>
### Install the SDK

```sh
# NPM
npm install @cartesia/cartesia-js

# Yarn
yarn add @cartesia/cartesia-js

# Bun
bun add @cartesia/cartesia-js

# PNPM
pnpm add @cartesia/cartesia-js
```

### Make the API call

```js
// hello.js
import { CartesiaClient } from "@cartesia/cartesia-js";
import fs from "node:fs";
import { spawn } from "node:child_process";
import process from "node:process";

if (!process.env.CARTESIA_API_KEY) {
  throw new Error("CARTESIA_API_KEY is not set");
}

// Set up the client.
const client = new CartesiaClient({
  apiKey: process.env.CARTESIA_API_KEY,
});

// Make the API call.
const response = await client.tts.bytes({
  modelId: "sonic-2",
  voice: {
    mode: "id",
    id: "694f9389-aac1-45b6-b726-9d9369183238",
  },
  outputFormat: {
    container: "wav",
    encoding: "pcm_f32le",
    sampleRate: 44100,
  },
  transcript: "Welcome to Cartesia Sonic!",
});

// Write `response` (of type ArrayBuffer) to a file.
fs.writeFileSync("sonic-2.wav", new Uint8Array(response));

// Play the file.
spawn("ffplay", ["-autoexit", "-nodisp", "sonic-2.wav"]);
```

### Run the script

```sh
env CARTESIA_API_KEY=YOUR_API_KEY node hello.js
```

The Cartesia API client also supports other runtimes, like Bun and Deno.

</Steps>
</Tab>

</Tabs>

The voice used above can be found [on the playground](https://play.cartesia.ai/voices/a0e99841-438c-4a64-b679-ae501e7d6091).
