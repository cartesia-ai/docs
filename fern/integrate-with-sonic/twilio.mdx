---
title: Integrate with Twilio
subtitle: >-
  How to integrate Twilio with Cartesia to generate audio from text and send it as a voice call.
---

This guide will walk you through the process of integrating Cartesia's Text-to-Speech (TTS) API with Twilio's calling capabilities. By following these steps, you'll be able to create an application that initiates phone calls and uses Cartesia's TTS to speak to the call recipient.

## Prerequisites

Before you begin, make sure you have the following:

1. [Node.js](https://nodejs.org/en/download) installed.
2. A [Twilio account](https://www.twilio.com/en-us/try-twilio). You will need your Account SID and Auth Token.
3. A [Cartesia API key](https://play.cartesia.ai/keys).
4. A phone number that you want to call.
5. A Twilio phone number to call from.

## Get Started

<Steps>

### Set Up Your Project

1. Create a new directory for your project and navigate to it in your terminal.
2. Initialize a new Node.js project:
   ```bash
   npm init -y
   ```
3. Install the required dependencies:
   ```bash
   npm install twilio ws http ngrok dotenv
   ```

### Configure Environment Variables

Create a `.env` file in your project root and add the following:

```sh
TWILIO_ACCOUNT_SID="your_twilio_account_sid"
TWILIO_AUTH_TOKEN="your_twilio_auth_token"
CARTESIA_API_KEY="your_cartesia_api_key"
```
Replace the placeholder values with your actual credentials.

### Create the Main Script

Create a file named `app.js` (or any name you prefer) and add the following code:

```javascript
const twilio = require('twilio');
const WebSocket = require('ws');
const http = require('http');
const ngrok = require('ngrok');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Function to get a value from environment variable or command line argument
function getConfig(key, defaultValue = undefined) {
  return process.env[key] || process.argv.find(arg => arg.startsWith(`${key}=`))?.split('=')[1] || defaultValue;
}

// Configuration
const config = {
    TWILIO_ACCOUNT_SID: getConfig('TWILIO_ACCOUNT_SID'),
    TWILIO_AUTH_TOKEN: getConfig('TWILIO_AUTH_TOKEN'),
    CARTESIA_API_KEY: getConfig('CARTESIA_API_KEY'),
};

// Validate required configuration
const requiredConfig = ['TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN', 'CARTESIA_API_KEY'];
for (const key of requiredConfig) {
    if (!config[key]) {
        console.error(`Missing required configuration: ${key}`);
        process.exit(1);
    }
}

const client = twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);
```

### Configure Cartesia TTS

In the script, you'll find a configuration section for Cartesia TTS. Make sure to set the following variables according to your needs:

```javascript
const TTS_WEBSOCKET_URL = `wss://api.cartesia.ai/tts/websocket?api_key=${config.CARTESIA_API_KEY}&cartesia_version=2024-11-13`;
const modelId = 'sonic-2';
const voice = {
    'mode': 'id',
    'id': "VOICE_ID" // You can check available voices using the Cartesia API or at https://play.cartesia.ai
};
const partialResponse = 'Hi there, my name is Cartesia. I hope youre having a great day!';
```

### Set Up Twilio Calling

Configure your Twilio outbound and inbound numbers:

```javascript
const outbound = "+1234567890"; // Replace with the number you want to call
const inbound = "+1234567890";  // Replace with your Twilio number
```

### Implement Main Logic

The `main()` function orchestrates the entire process:

1. Connects to the Cartesia TTS WebSocket
2. Tests the TTS WebSocket
3. Sets up a Twilio WebSocket server
4. Creates an ngrok tunnel for the Twilio WebSocket
5. Initiates the call using Twilio

```javascript
function connectToTTSWebSocket() {
  return new Promise((resolve, reject) => {
    log('Attempting to connect to TTS WebSocket');
    ttsWebSocket = new WebSocket(TTS_WEBSOCKET_URL);

    ttsWebSocket.on('open', () => {
      log('Connected to TTS WebSocket');
      resolve(ttsWebSocket);
    });

    ttsWebSocket.on('error', (error) => {
      log(`TTS WebSocket error: ${error.message}`);
      reject(error);
    });

    ttsWebSocket.on('close', (code, reason) => {
      log(`TTS WebSocket closed. Code: ${code}, Reason: ${reason}`);
      reject(new Error('TTS WebSocket closed unexpectedly'));
    });
  });
}

function sendTTSMessage(message) {
  const textMessage = {
    'model_id': modelId,
    'transcript': message,
    'voice': voice,
    'output_format': {
      'container': 'raw',
      'encoding': 'pcm_mulaw',
      'sample_rate': 8000
    }
  };

  log(`Sending message to TTS WebSocket: ${message}`);
  ttsWebSocket.send(JSON.stringify(textMessage));
}

function testTTSWebSocket() {
  return new Promise((resolve, reject) => {
    const testMessage = 'This is a test message';
    let receivedAudio = false;

    sendTTSMessage(testMessage);

    const timeout = setTimeout(() => {
      if (!receivedAudio) {
        reject(new Error('Timeout: No audio received from TTS WebSocket'));
      }
    }, 10000); // 10 second timeout

    ttsWebSocket.on('message', (audioChunk) => {
      if (!receivedAudio) {
        log(audioChunk);
        log('Received audio chunk from TTS for test message');
        receivedAudio = true;
        clearTimeout(timeout);
        resolve();
      }
    });
  });
}

async function startCall(twilioWebsocketUrl) {
  try {
    log(`Initiating call with WebSocket URL: ${twilioWebsocketUrl}`);
    const call = await client.calls.create({
      twiml: `<Response><Connect><Stream url="${twilioWebsocketUrl}"/></Connect></Response>`,
      to: outbound,  // Replace with the phone number you want to call
      from: inbound  // Replace with your Twilio phone number
    });

    callSid = call.sid;
    log(`Call initiated. SID: ${callSid}`);
  } catch (error) {
    log(`Error initiating call: ${error.message}`);
    throw error;
  }
}

async function hangupCall() {
  try {
    log(`Attempting to hang up call: ${callSid}`);
    await client.calls(callSid).update({status: 'completed'});
    log('Call hung up successfully');
  } catch (error) {
    log(`Error hanging up call: ${error.message}`);
  }
}

function setupTwilioWebSocket() {
    return new Promise((resolve, reject) => {
      const server = http.createServer((req, res) => {
        log(`Received HTTP request: ${req.method} ${req.url}`);
        res.writeHead(200);
        res.end('WebSocket server is running');
      });

      const wss = new WebSocket.Server({ server });

      log('WebSocket server created');

      wss.on('connection', (twilioWs, request) => {
        log(`Twilio WebSocket connection attempt from ${request.socket.remoteAddress}`);

        let streamSid = null;

        twilioWs.on('message', (message) => {
          try {
            const msg = JSON.parse(message);
            log(`Received message from Twilio: ${JSON.stringify(msg)}`);

            if (msg.event === 'start') {
              log('Media stream started');
              streamSid = msg.start.streamSid;
              log(`Stream SID: ${streamSid}`);
              sendTTSMessage(partialResponse);
            } else if (msg.event === 'media' && !messageComplete) {
              log('Received media event');
            } else if (msg.event === 'stop') {
              log('Media stream stopped');
              hangupCall();
            }
          } catch (error) {
            log(`Error processing Twilio message: ${error.message}`);
          }
        });

        twilioWs.on('close', (code, reason) => {
          log(`Twilio WebSocket disconnected. Code: ${code}, Reason: ${reason}`);
        });

        twilioWs.on('error', (error) => {
          log(`Twilio WebSocket error: ${error.message}`);
        });

        // Handle incoming audio chunks from TTS WebSocket
        ttsWebSocket.on('message', (audioChunk) => {
          log('Received audio chunk from TTS');
          try {
            if (streamSid) {
              twilioWs.send(JSON.stringify({
                event: 'media',
                streamSid: streamSid,
                media: {
                  payload: JSON.parse(audioChunk)['data']
                }
              }));

              audioChunksReceived++;
              log(`Audio chunks received: ${audioChunksReceived}`);

              if (audioChunksReceived >= 50) {
                messageComplete = true;
                log('Message complete, preparing to hang up');
                setTimeout(hangupCall, 2000);
              }
            } else {
              log('Warning: Received audio chunk but streamSid is not set');
            }
          } catch (error) {
            log(`Error sending audio chunk to Twilio: ${error.message}`);
          }
        });

        log('Twilio WebSocket connected and handlers set up');
      });

      wss.on('error', (error) => {
        log(`WebSocket server error: ${error.message}`);
      });

      server.listen(0, () => {
        const port = server.address().port;
        log(`Twilio WebSocket server is running on port ${port}`);
        resolve(port);
      });

      server.on('error', (error) => {
        log(`HTTP server error: ${error.message}`);
        reject(error);
      });
    });
  }

async function setupNgrokTunnel(port) {
    try {
      const httpsUrl = await ngrok.connect(port);
      // Convert https:// to wss://
      const wssUrl = httpsUrl.replace('https://', 'wss://');
      log(`ngrok tunnel established: ${wssUrl}`);
      return wssUrl;
    } catch (error) {
      log(`Error setting up ngrok tunnel: ${error.message}`);
      throw error;
    }
  }

async function main() {
  try {
    log('Starting application');

    await connectToTTSWebSocket();
    log('TTS WebSocket connected successfully');

    await testTTSWebSocket();
    log('TTS WebSocket test passed successfully');

    const twilioWebsocketPort = await setupTwilioWebSocket();
    log(`Twilio WebSocket server set up on port ${twilioWebsocketPort}`);

    const twilioWebsocketUrl = await setupNgrokTunnel(twilioWebsocketPort);

    await startCall(twilioWebsocketUrl);
  } catch (error) {
    log(`Error in main function: ${error.message}`);
  }
}

// Run the script
main();
```

### Run the Application

To run the application, use the following command:

```bash
node app.js
```

</Steps>

## How It Works

1. The script establishes a connection to Cartesia's TTS WebSocket.
2. It sets up a local WebSocket server to communicate with Twilio.
3. An ngrok tunnel is created to expose the local WebSocket server to the internet.
4. A call is initiated using Twilio, connecting to the ngrok tunnel.
5. When the call connects, the script sends the predefined message to Cartesia's TTS.
6. Cartesia converts the text to speech and sends audio chunks back.
7. The script forwards these audio chunks to Twilio, which plays them on the call.

## Customization

- To change the spoken message, modify the `partialResponse` variable.
- Adjust the voice parameters in the `voice` object to change the TTS voice characteristics.
- Modify the `audioChunksReceived` threshold to control when the call should end.

## Troubleshooting

- If you encounter any issues, check the console logs for detailed error messages.
- Ensure all required environment variables are correctly set.
- Verify that your Twilio and Cartesia credentials are valid and have the necessary permissions.
