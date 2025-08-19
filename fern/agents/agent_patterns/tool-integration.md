# Tool Integration

Tool integration enables agents to call external functions and APIs during conversations, extending their capabilities beyond text generation.

## Pattern Overview

This pattern involves:
- **Tool Calls**: Agents request function execution via `ToolCall` events
- **Tool Results**: Functions return results via `ToolResult` events  
- **Async Execution**: Tools can execute synchronously or asynchronously
- **Error Handling**: Failed tool calls are handled gracefully with error information

## Key Components

### Events
- **`ToolCall`**: Request to execute a function with arguments
- **`ToolResult`**: Result of tool execution (success or error)
- **Correlation**: Tool calls and results linked by `tool_call_id`

### Nodes
- **Tool-Aware Agents**: Generate `ToolCall` events during processing
- **Context Integration**: Process `ToolResult` events to continue conversation
- **Error Recovery**: Handle tool failures gracefully

### Routes
- **Tool Execution**: Route `ToolCall` events to tool handlers
- **Result Processing**: Route `ToolResult` events back to agents
- **Parallel Processing**: Multiple tools can execute concurrently

## Basic Example

```python
from line.events import ToolCall, ToolResult

# Agent generates tool calls
class ToolCapableAgent(ReasoningNode):
    async def process_context(self, context):
        user_msg = context.get_latest_user_transcript_message()
        
        if "weather" in user_msg.lower():
            # Request weather information
            yield ToolCall(
                tool_name="get_weather",
                tool_args={"location": "New York", "units": "fahrenheit"}
            )
            
        # Continue processing after tools complete
        yield AgentResponse(content="Let me check that for you...")

# Tool execution handler
async def execute_weather_tool(tool_call):
    try:
        weather_data = await weather_api.get_current(
            location=tool_call.tool_args["location"],
            units=tool_call.tool_args["units"]
        )
        
        return ToolResult(
            tool_name=tool_call.tool_name,
            tool_args=tool_call.tool_args,
            result=weather_data,
            tool_call_id=tool_call.tool_call_id
        )
    except Exception as e:
        return ToolResult(
            tool_name=tool_call.tool_name,
            tool_args=tool_call.tool_args,
            error=str(e),
            tool_call_id=tool_call.tool_call_id
        )

# Route tool calls to handlers
bridge.on(ToolCall).map(execute_weather_tool).broadcast()

# Route results back to agent
bridge.on(ToolResult).map(node.add_event)
```

## Advanced Tool Integration

### Multiple Tool Support

```python
class MultiToolAgent(ReasoningNode):
    def __init__(self, tools_config):
        super().__init__()
        self.tools = tools_config
        
    async def process_context(self, context):
        user_input = context.get_latest_user_transcript_message()
        
        # Analyze what tools are needed
        if self.needs_weather_info(user_input):
            yield ToolCall(tool_name="get_weather", tool_args={"location": "NYC"})
            
        if self.needs_calendar_info(user_input):
            yield ToolCall(tool_name="get_calendar", tool_args={"date": "today"})
            
        if self.needs_calculation(user_input):
            yield ToolCall(tool_name="calculate", tool_args={"expression": "2+2"})
            
        # Wait for all tool results, then respond
        yield AgentResponse(content="Let me gather that information...")

# Tool registry and dispatcher
class ToolDispatcher:
    def __init__(self):
        self.tools = {
            "get_weather": self.get_weather,
            "get_calendar": self.get_calendar,
            "calculate": self.calculate
        }
        
    async def execute_tool(self, tool_call):
        tool_func = self.tools.get(tool_call.tool_name)
        if not tool_func:
            return ToolResult(
                tool_name=tool_call.tool_name,
                tool_args=tool_call.tool_args,
                error=f"Unknown tool: {tool_call.tool_name}",
                tool_call_id=tool_call.tool_call_id
            )
            
        try:
            result = await tool_func(**tool_call.tool_args)
            return ToolResult(
                tool_name=tool_call.tool_name,
                tool_args=tool_call.tool_args,
                result=result,
                tool_call_id=tool_call.tool_call_id
            )
        except Exception as e:
            return ToolResult(
                tool_name=tool_call.tool_name,
                tool_args=tool_call.tool_args,
                error=str(e),
                tool_call_id=tool_call.tool_call_id
            )

dispatcher = ToolDispatcher()
bridge.on(ToolCall).map(dispatcher.execute_tool).broadcast()
```

### Tool Result Processing

```python
class ToolAwareAgent(ReasoningNode):
    async def process_context(self, context):
        # Check for tool results in context
        tool_results = [e for e in context.events if isinstance(e, ToolResult)]
        
        if tool_results:
            # Process tool results
            for result in tool_results:
                if result.success:
                    yield AgentResponse(
                        content=f"Based on {result.tool_name}, the result is: {result.result_str}"
                    )
                else:
                    yield AgentResponse(
                        content=f"I encountered an error with {result.tool_name}: {result.error}"
                    )
        else:
            # Normal conversation flow
            user_msg = context.get_latest_user_transcript_message()
            
            # Check if we need to call tools
            if self.requires_external_data(user_msg):
                yield ToolCall(tool_name="search", tool_args={"query": user_msg})
            else:
                yield AgentResponse(content="How can I help you?")
```

## System Tools Pattern

```python
# Built-in system tools for common operations
from line.tools import system_tools

# End call tool
yield ToolCall(tool_name="end_call", tool_args={"reason": "User requested"})

# Transfer call tool  
yield ToolCall(tool_name="transfer_call", tool_args={
    "destination": "+15551234567",
    "reason": "Technical support needed"
})

# Agent handoff tools (following naming convention)
yield ToolCall(tool_name="transfer_to_billing", tool_args={
    "reason": "Customer has billing questions"
})
```

## Best Practices

1. **Error Handling**: Always handle tool failures gracefully
2. **Async Tools**: Use async functions for I/O operations (API calls, DB queries)
3. **Tool Validation**: Validate tool arguments before execution
4. **Result Context**: Include tool results in conversation context for follow-up
5. **Tool Discovery**: Implement tool registration and discovery patterns
6. **Correlation IDs**: Use tool_call_id to match calls with results
7. **Timeout Handling**: Set reasonable timeouts for tool execution

## Common Use Cases

- **API Integration**: Call external APIs for data (weather, stocks, news)
- **Database Operations**: Query databases for user information
- **Calculations**: Perform complex calculations or data analysis
- **System Integration**: Interact with internal business systems
- **Multi-step Workflows**: Chain multiple tool calls for complex tasks
- **Real-time Data**: Fetch live information during conversations

## Error Scenarios

### Tool Not Found
```python
ToolResult(
    tool_name="unknown_tool",
    error="Tool 'unknown_tool' not found",
    tool_call_id=tool_call_id
)
```

### Tool Execution Error
```python
ToolResult(
    tool_name="database_query",
    error="Connection timeout to database",
    tool_call_id=tool_call_id
)
```

### Invalid Arguments
```python
ToolResult(
    tool_name="weather_api",
    error="Invalid location parameter: 'xyz123'",
    tool_call_id=tool_call_id
)
```

This pattern enables agents to become more capable by integrating with external systems and data sources while maintaining conversational flow.