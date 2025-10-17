# Nodes

Nodes contain your agent logic. They process events, maintain conversation
context, and generate responses from LLMs.

## What is a Node?

Nodes are where the "thinking" happens in your agent system. It contain the
business logic and LLM interactions.

## Basic Example

```python
from line.nodes import ReasoningNode
from line.events import AgentResponse


class ChatNode(ReasoningNode):
    def __init__(self, system_prompt, llm_client):
        super().__init__(system_prompt=system_prompt)
        self.llm_client = llm_client

    async def process_context(self, context):
        # Get conversation history and system prompt
        messages = self.format_for_llm(context.events)

        # Generate response from LLM
        response = await self.llm_client.generate(messages)

        # Yield response to be spoken to user
        yield AgentResponse(content=response)
```

## Node Types

| Type                | Description                                                          |
| ------------------- | -------------------------------------------------------------------- |
| **`Node`**          | Base class for all nodes                                             |
| **`ReasoningNode`** | Template for conversational agents with automatic context management |

<Tip>
`ReasoningNode` is the base class for all nodes that use LLMs. Users should implement the `process_context()` method to process messages and yield events asynchronously.
</Tip>

## Key Features

- **Event Processing**: Receive and process events from bridges
- **State Management**: Maintain conversation history and context
- **Response Generation**: Yield events back through the system
- **Lifecycle Hooks**: `start()` method for async initialization

Nodes can work together in multi-agent systems. See
[Agent Patterns](../agent-patterns/multi-agent-coordination) for coordination
examples.
