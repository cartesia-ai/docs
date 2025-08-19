# Multi-Agent Coordination

Multi-agent systems enable specialized agents to work together by processing events in parallel and communicating through custom events and agent handoffs.

## Pattern Overview

This pattern involves:
- **Speaking Agent**: Only one agent can send voice responses to the user at a time
- **Background Agents**: Process events and emit insights without speaking
- **Custom Events**: Enable communication between agents
- **Agent Handoffs**: Transfer speaking rights between agents

## Key Components

### Events
- **Custom Events**: Define communication between agents
- **`AgentHandoff`**: Transfer speaking rights to another agent
- **Built-in Events**: All agents can process user input and system events

### Nodes
- **Speaking Node**: Authorized to send `AgentResponse` events to the user
- **Background Nodes**: Process events and emit insights for other agents
- **Specialized Nodes**: Each focuses on specific tasks or domains

### Routes
- **Parallel Processing**: Multiple agents process the same user input
- **Event Broadcasting**: Custom events flow between agent bridges
- **Authorization Control**: Only authorized agent can respond to user

## Example: Sales with Background Lead Analysis

```python
from pydantic import BaseModel

# Custom events for inter-agent communication
class LeadIdentified(BaseModel):
    company_name: str
    contact_info: dict
    interest_level: str

class CompanyResearch(BaseModel):
    company_name: str
    industry: str
    revenue: str
    decision_makers: list

async def setup_multi_agent_system(system: VoiceAgentSystem):
    # Main sales agent (speaking)
    sales_node = SalesNode(system_prompt="You are a helpful sales representative.")
    sales_bridge = Bridge(sales_node)
    system.with_speaking_node(sales_node, bridge=sales_bridge)

    # Background lead extraction agent
    leads_node = LeadExtractionNode()
    leads_bridge = Bridge(leads_node)
    system.with_node(leads_node, leads_bridge)

    # Background research agent
    research_node = CompanyResearchNode()
    research_bridge = Bridge(research_node)
    system.with_node(research_node, research_bridge)

    # Route user input to all agents
    sales_bridge.on(UserTranscriptionReceived).map(sales_node.add_event)
    leads_bridge.on(UserTranscriptionReceived).map(leads_node.add_event)
    
    # Sales agent responds to user
    (
        sales_bridge.on(UserStoppedSpeaking)
        .stream(sales_node.generate)
        .broadcast()
    )

    # Background lead analysis
    (
        leads_bridge.on(UserStoppedSpeaking)
        .stream(leads_node.generate)
        .broadcast()
    )

    # Research agent processes identified leads
    research_bridge.on(LeadIdentified).map(research_node.add_event)
    (
        research_bridge.on(LeadIdentified)
        .stream(research_node.generate)
        .broadcast()
    )

    # Sales agent receives research insights
    sales_bridge.on(CompanyResearch).map(sales_node.add_context)
```

## Agent Handoff Example

```python
# Transfer conversation to technical specialist
class TechnicalSupportRequest(BaseModel):
    issue_type: str
    complexity: str

# Sales agent identifies need for handoff
async def process_context(self, context):
    if technical_question_detected:
        yield AgentHandoff(
            target_agent="technical_support",
            reason="Customer has technical questions about implementation"
        )

# Set up handoff routing
tech_bridge.on(TechnicalSupportRequest).map(
    lambda _: AgentHandoff(target_agent="technical_support")
).broadcast()
```

## Best Practices

1. **Clear Separation**: Each agent should have distinct responsibilities
2. **Custom Events**: Define typed events for inter-agent communication
3. **Background Processing**: Use non-speaking agents for analysis and insights
4. **Contextual Handoffs**: Transfer agents based on conversation context
5. **Authorization Management**: Only one agent should speak at a time

## Common Use Cases

- **Sales with Research**: Sales agent with background lead analysis and research
- **Support with Escalation**: General support with specialist handoffs
- **Multi-lingual**: Language detection with appropriate agent routing
- **Form Filling**: Conversation agent with form validation agent
- **Analysis Pipeline**: Multiple analysis agents feeding insights to main agent

This pattern enables sophisticated agent coordination while maintaining clear conversation flow and user experience.
