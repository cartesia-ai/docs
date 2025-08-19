# SDK Overview

The [Line SDK](https://github.com/cartesia-ai/line/) uses an **event-driven architecture** where components communicate through typed events. A central Bus routes messages between components, enabling flexible agent coordination.


## Core Concepts

**Event**: An object sent between components of the voice agent system (e.g., `UserTranscriptionReceived`, `AgentResponse`, `ToolCall`). This is the core unit of communication between components. Events are wrapped in a `Message` before being sent to the bus.

**Node**: A stateful event processor that handles conversations and generates events. Typically an AI agent that processes user input and creates replies.

**Bridge**: A component that connects nodes to the event bus. Each bridge can be configured with different routes, that trigger based on different events. Messages are received and sent on the Bridge.

**Route**: An event processing pipeline. They specify what operations to run when certain events occur. A route is triggered on a specific event type or regex pattern.

### System Components

These components work behind the scenes to orchestrate your voice agent:

**VoiceAgentSystem**: The builder that orchestrates all components for a single call. It manages the lifecycle and connections between your nodes and bridges.

**VoiceAgentApp**: The main entry point that handles WebSocket connections and creates a new `VoiceAgentSystem` for each call.

**Bus**: The central message bus that delivers messages between all components. You rarely interact with it directly - it works automatically behind the scenes. Events are automatically wrapped in `Message` objects when they are sent to the bus.


## Installation

### Install the SDK

Install the base SDK:

```bash
pip install cartesia-line

# ====== Optional Dependencies ======
pip install "cartesia-line[gemini]"  # gemini utilities.
pip install "cartesia-line[openai]"  # openai utilities.
pip install "cartesia-line[dev]"     # development support.
```

### Install the CLI

Install the CLI for testing your agents:

```bash
# Cartesia CLI -- we will use this for testing our agent.
curl -fsSL https://cartesia.sh | sh
```

## Quick Start

Ready to build your first voice agent? Follow our step-by-step guide:

**[Talk to your first agent](../../line/start-building/talk-to-your-first-agent)** - Create a simple chat agent that responds to user input using OpenAI.

## Examples

Explore complete working examples in our GitHub repository: [cartesia-ai/line](https://github.com/cartesia-ai/line/tree/main/examples)