# Interruption Handling

Interruption handling allows agents to gracefully stop generating responses when the user starts speaking, creating natural conversational flow.

## Pattern Overview

This pattern enables:
- **Natural Conversation**: User can interrupt agent at any time
- **Graceful Cancellation**: Agent stops generating without errors
- **Resource Cleanup**: Proper cleanup of ongoing operations
- **Seamless Recovery**: Agent can resume processing new user input

## Key Components

### Events
- **`UserStartedSpeaking`**: Triggers interruption of ongoing generation
- **`UserStoppedSpeaking`**: Resumes normal processing flow
- **`AgentGenerationComplete`**: Signals when generation finishes

### Routes
- **`interrupt_on()`**: Defines which events should cancel the current operation
- **Interrupt Handlers**: Custom functions to handle cancellation cleanup
- **Task Cancellation**: Automatic cancellation of async tasks

### Nodes
- **Interrupt Awareness**: Nodes handle `asyncio.CancelledError` gracefully
- **Cleanup Logic**: Implement interrupt handlers for resource cleanup
- **State Recovery**: Maintain consistent state after interruptions

## Basic Example

```python
# Basic interruption setup
(
    bridge.on(UserStoppedSpeaking)
    .interrupt_on(UserStartedSpeaking)
    .stream(node.generate)
    .broadcast()
)

# With custom interrupt handler
async def handle_interrupt(message):
    logger.info("User interrupted, stopping generation")
    # Perform any needed cleanup
    await cleanup_resources()

(
    bridge.on(UserStoppedSpeaking)
    .interrupt_on(UserStartedSpeaking, handler=handle_interrupt)
    .stream(node.generate)
    .broadcast()
)
```

## Node-Level Interruption Handling

```python
class InterruptAwareNode(ReasoningNode):
    def on_interrupt_generate(self, message):
        """Called when generation is interrupted."""
        logger.info("Generation interrupted by user")
        # Cleanup streaming resources, cancel API calls, etc.
        
    async def process_context(self, context):
        try:
            # Stream response chunks
            async for chunk in self.llm_client.generate_stream(messages):
                yield AgentResponse(content=chunk.text)
                
        except asyncio.CancelledError:
            # Handle cancellation gracefully
            logger.info("Generation cancelled due to user interruption")
            # Perform any final cleanup
            raise  # Re-raise to complete cancellation

# Connect interrupt handler in route
(
    bridge.on(UserStoppedSpeaking)
    .interrupt_on(UserStartedSpeaking, handler=node.on_interrupt_generate)
    .stream(node.generate)
    .broadcast()
)
```

## Advanced Patterns

### Conditional Interruption

```python
# Only allow interruption after agent has spoken for a minimum time
def can_interrupt(message):
    return time.time() - generation_start_time > MIN_SPEAK_TIME

(
    bridge.on(UserStoppedSpeaking)
    .interrupt_on(UserStartedSpeaking, condition=can_interrupt)
    .stream(node.generate)
    .broadcast()
)
```

### Multiple Interrupt Events

```python
# Interrupt on multiple event types
(
    bridge.on(UserStoppedSpeaking)
    .interrupt_on([UserStartedSpeaking, EmergencyStop, AgentHandoff])
    .stream(node.generate)
    .broadcast()
)
```

### State Management During Interruptions

```python
class StatefulInterruptNode(ReasoningNode):
    def __init__(self):
        super().__init__()
        self.generation_state = None
        
    def on_interrupt_generate(self, message):
        # Save state for potential recovery
        self.generation_state = {
            'interrupted_at': time.time(),
            'partial_response': self.current_response,
            'context_snapshot': self.context.copy()
        }
        logger.info("Saved generation state for recovery")
        
    async def process_context(self, context):
        try:
            # Check if resuming from interruption
            if self.generation_state:
                logger.info("Resuming from previous interruption")
                # Potentially use saved state
                self.generation_state = None
                
            # Normal generation flow
            async for chunk in self.generate_response(context):
                yield AgentResponse(content=chunk)
                
        except asyncio.CancelledError:
            logger.info("Generation cancelled")
            raise
```

## Best Practices

1. **Always Handle CancelledError**: Nodes should gracefully handle task cancellation
2. **Cleanup Resources**: Use interrupt handlers to cleanup API calls, files, connections
3. **Maintain State Consistency**: Ensure node state remains valid after interruptions
4. **Log Interruptions**: Track interruption patterns for debugging and optimization
5. **Fast Interruption Response**: Keep interrupt handlers lightweight and fast
6. **Recovery Planning**: Consider how to handle partial responses and state recovery

## Common Use Cases

- **Voice Conversations**: Natural turn-taking in voice interactions
- **Long Responses**: Allow interruption of lengthy agent responses
- **Emergency Stops**: Immediate cancellation for safety or escalation
- **Context Switches**: Interrupt current task when user changes topic
- **Multi-Agent Handoffs**: Cancel current agent when transferring to another

## Troubleshooting

### Generation Doesn't Stop
- Ensure `interrupt_on()` is properly configured on the route
- Check that the node properly handles `asyncio.CancelledError`
- Verify interrupt events are being properly emitted

### Resource Leaks
- Implement interrupt handlers to cleanup streaming connections
- Use `async with` contexts for resource management
- Cancel pending API calls in interrupt handlers

### State Corruption
- Save critical state before generation starts
- Validate state consistency after interruptions
- Consider using database transactions for critical state changes

This pattern is essential for creating natural, responsive voice agents that feel conversational rather than robotic.