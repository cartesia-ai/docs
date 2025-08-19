# Tips

Tips for building voice agents with the Line SDK.

## Observability

Monitor your voice agents by tracking custom events and metrics. The Line SDK automatically captures these for analysis on the Cartesia platform.

### Track Custom Events

Define and track custom events during your voice agent calls.

```python
from line import register_observability_event
from pydantic import BaseModel

# Define your custom event
class LeadCaptured(BaseModel):
    customer_name: str
    interest_level: str
    contact_method: str

async def handle_new_call(system: VoiceAgentSystem, call_request: CallRequest):
    # Set up your agent.
    chat_node = ChatNode()
    bridge = Bridge(chat_node)
    system.with_speaking_node(chat_node, bridge)

    # Register event type for tracking.
    register_observability_event(
        system.user_bridge,
        system.harness,
        LeadCaptured
    )

    # Your agent can now yield LeadCaptured events.
    bridge.on(UserStoppedSpeaking).stream(chat_node.generate).broadcast()
```

### Log Metrics

Log metrics during the call to track performance or other characteristics of the call.

```python
import time
from line.events import LogMetric

async def track_response_time(msg: Message):
    start_time = time.time()

    # Process the request
    result = await process_user_request(msg.event.content)

    # Calculate and log timing
    duration = time.time() - start_time
    yield LogMetric(name="response_time_seconds", value=duration)

    # Also yield business events
    if result.is_qualified_lead:
        yield LeadCaptured(
            customer_name=result.name,
            interest_level="high",
            contact_method="phone"
        )

# Track timing for all user requests
bridge.on(UserStoppedSpeaking).stream(track_response_time).broadcast()
```


### Using `loguru` for Proper Logging

Configure loguru as your logger to see results in the UI and have logs captured:

```python
from loguru import logger
import sys

# Use in your nodes
class ChatNode(ReasoningNode):
    async def process_context(self, context: ConversationContext):
        logger.info(f"Processing {len(context.events)} events")
        
        # Your processing logic
        messages = convert_messages_to_openai(context.events)
        
        logger.debug(f"Generated {len(messages)} messages for LLM")
        
        for chunk in client.chat.completions.create(
            model="gpt-4", messages=messages, stream=True
        ):
            if chunk.choices[0].delta.content:
                content = chunk.choices[0].delta.content
                logger.trace(f"Streaming content: {content[:50]}...")
                yield AgentResponse(content=content)
```

## Performance

### Efficient Event Filtering

Filter events at the bridge level for better performance:

```python
# Good: Filter at bridge level
bridge.on(UserTranscriptionReceived, source=node.id).map(handle_user_input)
bridge.on(ToolCall, tool_name="transfer").map(handle_transfer)
```
