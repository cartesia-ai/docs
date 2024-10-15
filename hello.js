import Cartesia from "@cartesia/cartesia-js";
import fs from "node:fs";
import FFmpeg from "fluent-ffmpeg";
import { spawn } from "node:child_process";
import { Buffer } from "node:buffer";

const ffmpeg = new FFmpeg();

const cartesia = new Cartesia({
	apiKey: process.env.CARTESIA_API_KEY,
});

// Initialize the WebSocket. Make sure the output format you specify is supported.
const websocket = cartesia.tts.websocket({
	container: "raw",
	encoding: "pcm_f32le",
	sampleRate: 44100
});

try {
	await websocket.connect();
} catch (error) {
	console.error(`Failed to connect to Cartesia: ${error}`);
}

// Create a stream.
const response = await websocket.send({
	model_id: "sonic-english",
	voice: {
		mode: "id",
		id: "a0e99841-438c-4a64-b679-ae501e7d6091",
	},
	transcript: "Hello, world!"
	// The WebSocket sets output_format to the following by default:
	// output_format: {
	// 	container: "raw",
	// 	encoding: "pcm_f32le",
	// 	sampleRate: 44100,
	// }
});

// The response contains a `Source` object that you can use to access the raw PCM audio bytes.
const { source } = response;

// Create a buffer for 1 second of audio.
const buf = new Float32Array(source.durationToSampleCount(1));

const file = fs.createWriteStream("sonic.pcm");

while (true) {
	const read = await source.read(buf);
	// If we've reached the end of the source, then read < buffer.length.
	// In that case, we don't want to play the entire buffer, as that
	// will cause repeated audio.
	const playableAudio = buf.subarray(0, read);

	file.write(Buffer.from(playableAudio.buffer));

	if (read < buf.length) {
		// No more audio to read.
		break;
	}
}

// Clean up.
file.close();
websocket.disconnect();

// Convert the raw PCM bytes to a WAV file.
ffmpeg.input("sonic.pcm").inputFormat("f32le").output("sonic.wav").run();

// Play the file.
spawn("ffplay", ["-autoexit", "-nodisp", "sonic.wav"]);
