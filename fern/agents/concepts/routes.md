# Routes

Routes are the event processing pipelines. They connect events to processing logic.

## What is a Route?

Routes connect events to processing logic. They create pipelines where data flows through operations.

## Basic Example

```python
# Simple event routing
bridge.on(UserTranscriptionReceived).map(node.add_event)
```

Routes are built using a fluent API, where operations can be chained together:

```python
# Generate responses when user stops speaking.
(
    bridge.on(UserStoppedSpeaking)  # Trigger route on UserStoppedSpeaking event.
    .stream(chat_node.generate)     # Process the event using `node.generate()`. Stream (i.e. yield) output events.
    .broadcast()                    # Broadcast the output events.
    .interrupt_on(                  # If UserStartedSpeaking event occurs while route is running, cancel the route and run the handler.
        UserStartedSpeaking,
        handler=chat_node.on_interrupt_generate,
    )
)
```

## Core Operations

| Operation           | Description                                           |
| ------------------- | ----------------------------------------------------- |
| `on(Event)`         | Listen for specific event types                       |
| `map(function)`     | Transform data by applying a function                 |
| `filter(condition)` | Continue processing only if condition is met          |
| `stream(generator)` | Process async generators that yield multiple values   |
| `broadcast()`       | Send results to other components (terminal operation) |

## Key Features

- **Declarative Processing**: Define what happens when events occur
- **Pipeline Chaining**: Link operations to transform and route data
- **Interrupt Handling**: Gracefully handle conversation interruptions
- **Multi-Agent Coordination**: Route events between different agents

Routes enable event processing patterns and agent coordination. See [Agent Patterns](../agent-patterns/) for pipeline examples.
