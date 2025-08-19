# Event Transformation

Event transformation patterns enable converting one event type to another, enriching event data, and creating custom event flows for specialized processing.

## Pattern Overview

This pattern enables:
- **Type Conversion**: Transform built-in events to custom events
- **Data Enrichment**: Add context and metadata to events
- **Event Splitting**: Convert one event into multiple specialized events
- **Event Aggregation**: Combine multiple events into summary events

## Key Components

### Events
- **Source Events**: Original events to be transformed
- **Target Events**: New events created from transformations
- **Custom Events**: Domain-specific event types for your application

### Routes
- **Transform Mapping**: Use `map()` to convert event types
- **Broadcasting**: Send transformed events through the system
- **Filtering**: Apply transformations conditionally

### Transformation Functions
- **Pure Transformations**: Convert data without side effects
- **Enrichment**: Add external data to events
- **Analysis**: Extract insights and create derived events

## Basic Transformation Example

```python
from pydantic import BaseModel
from datetime import datetime

# Custom events for sentiment analysis
class SentimentAnalysis(BaseModel):
    text: str
    sentiment: str
    confidence: float
    timestamp: datetime

class ConversationInsight(BaseModel):
    insight_type: str
    description: str
    confidence: float
    
# Transform user input to sentiment analysis
def analyze_sentiment(message) -> SentimentAnalysis:
    """Transform UserTranscriptionReceived to SentimentAnalysis."""
    transcription = message.event
    
    # Analyze sentiment (simplified)
    sentiment_result = sentiment_analyzer.analyze(transcription.content)
    
    return SentimentAnalysis(
        text=transcription.content,
        sentiment=sentiment_result.label,
        confidence=sentiment_result.score,
        timestamp=datetime.now()
    )

# Route transformation
(
    bridge.on(UserTranscriptionReceived)
    .map(analyze_sentiment)
    .broadcast()
)

# Other agents can subscribe to sentiment analysis
analysis_bridge.on(SentimentAnalysis).map(process_sentiment_insight)
```

## Advanced Transformation Patterns

### Multi-Target Transformation

```python
class CustomerProfile(BaseModel):
    customer_id: str
    interaction_type: str
    sentiment: str
    topics: list[str]

class RiskAssessment(BaseModel):
    customer_id: str
    risk_level: str
    risk_factors: list[str]

async def analyze_customer_interaction(message):
    """Transform user input into multiple analysis events."""
    user_input = message.event.content
    
    # Extract customer context
    customer_id = extract_customer_id(message)
    
    # Analyze interaction
    topics = await topic_classifier.classify(user_input)
    sentiment = await sentiment_analyzer.analyze(user_input)
    risk_factors = await risk_analyzer.assess(user_input, customer_id)
    
    # Yield multiple transformed events
    yield CustomerProfile(
        customer_id=customer_id,
        interaction_type="voice_call",
        sentiment=sentiment.label,
        topics=topics
    )
    
    if risk_factors:
        yield RiskAssessment(
            customer_id=customer_id,
            risk_level=calculate_risk_level(risk_factors),
            risk_factors=risk_factors
        )

# Stream transformation to multiple event types
(
    bridge.on(UserTranscriptionReceived)
    .stream(analyze_customer_interaction)
    .broadcast()
)
```

### Event Aggregation

```python
class ConversationSummary(BaseModel):
    conversation_id: str
    duration_minutes: int
    total_exchanges: int
    customer_satisfaction: str
    key_topics: list[str]
    resolution_status: str

class ConversationAggregator:
    def __init__(self):
        self.conversation_data = {}
    
    def aggregate_events(self, message):
        """Aggregate various events into conversation summary."""
        event = message.event
        conv_id = getattr(event, 'conversation_id', 'default')
        
        # Initialize conversation tracking
        if conv_id not in self.conversation_data:
            self.conversation_data[conv_id] = {
                'start_time': datetime.now(),
                'exchanges': 0,
                'sentiments': [],
                'topics': set(),
                'events': []
            }
        
        conv = self.conversation_data[conv_id]
        conv['events'].append(event)
        
        # Process different event types
        if isinstance(event, UserTranscriptionReceived):
            conv['exchanges'] += 1
        elif isinstance(event, SentimentAnalysis):
            conv['sentiments'].append(event.sentiment)
        elif isinstance(event, TopicAnalysis):
            conv['topics'].update(event.topics)
        elif isinstance(event, EndCall):
            # Generate summary when conversation ends
            summary = ConversationSummary(
                conversation_id=conv_id,
                duration_minutes=self._calculate_duration(conv['start_time']),
                total_exchanges=conv['exchanges'],
                customer_satisfaction=self._analyze_satisfaction(conv['sentiments']),
                key_topics=list(conv['topics']),
                resolution_status=self._determine_resolution(conv['events'])
            )
            
            # Clean up tracking data
            del self.conversation_data[conv_id]
            return summary
        
        return None  # No summary yet

aggregator = ConversationAggregator()

# Aggregate multiple event types
(
    bridge.on([UserTranscriptionReceived, SentimentAnalysis, TopicAnalysis, EndCall])
    .map(aggregator.aggregate_events)
    .filter(lambda summary: summary is not None)
    .broadcast()
)
```

### Conditional Transformation

```python
def transform_based_on_context(message):
    """Transform events differently based on context."""
    user_input = message.event
    context = get_conversation_context(message.source)
    
    # Different transformations based on conversation state
    if context.state == "authentication":
        return SecurityEvent(
            event_type="auth_attempt",
            input_text=user_input.content,
            security_level=assess_security_risk(user_input.content)
        )
    
    elif context.state == "form_filling":
        return FormFieldUpdate(
            field_name=context.current_field,
            field_value=user_input.content,
            validation_status=validate_field_input(
                context.current_field, 
                user_input.content
            )
        )
    
    elif context.state == "complaint_handling":
        return ComplaintAnalysis(
            complaint_text=user_input.content,
            severity=analyze_complaint_severity(user_input.content),
            category=classify_complaint_category(user_input.content)
        )
    
    # Default transformation
    return GeneralInquiry(
        inquiry_text=user_input.content,
        intent=classify_intent(user_input.content)
    )

(
    bridge.on(UserTranscriptionReceived)
    .map(transform_based_on_context)
    .broadcast()
)
```

## Real-time Enrichment

```python
async def enrich_with_external_data(message):
    """Enrich events with external API data."""
    user_input = message.event
    customer_id = extract_customer_id(message)
    
    # Fetch enrichment data in parallel
    customer_data, product_data, interaction_history = await asyncio.gather(
        customer_api.get_profile(customer_id),
        product_api.get_preferences(customer_id),
        interaction_db.get_recent_interactions(customer_id)
    )
    
    return EnrichedUserInput(
        original_content=user_input.content,
        customer_profile=customer_data,
        product_preferences=product_data,
        interaction_context=interaction_history,
        enrichment_timestamp=datetime.now()
    )

(
    bridge.on(UserTranscriptionReceived)
    .map(enrich_with_external_data)
    .broadcast()
)
```

## Event Chain Transformation

```python
def create_event_chain(initial_event):
    """Create a chain of related events from an initial event."""
    events = []
    
    # Base analysis
    analysis = analyze_user_input(initial_event)
    events.append(UserInputAnalysis(
        content=initial_event.content,
        intent=analysis.intent,
        entities=analysis.entities
    ))
    
    # Intent-specific events
    if analysis.intent == "product_inquiry":
        events.append(ProductInterest(
            products=analysis.entities.get('products', []),
            interest_level=analysis.confidence
        ))
    
    elif analysis.intent == "support_request":
        events.append(SupportTicket(
            category=analysis.entities.get('category', 'general'),
            priority=determine_priority(analysis),
            description=initial_event.content
        ))
    
    # Always create engagement metric
    events.append(EngagementMetric(
        interaction_type="user_input",
        engagement_score=calculate_engagement(analysis),
        timestamp=datetime.now()
    ))
    
    return events

async def chain_transformer(message):
    """Generator that yields chain of transformed events."""
    event_chain = create_event_chain(message.event)
    for event in event_chain:
        yield event

(
    bridge.on(UserTranscriptionReceived)
    .stream(chain_transformer)
    .broadcast()
)
```

## Best Practices

1. **Type Safety**: Use Pydantic models for all custom events
2. **Documentation**: Document what each transformation does and why
3. **Error Handling**: Handle transformation failures gracefully
4. **Performance**: Cache expensive operations like API calls
5. **Selective Processing**: Use filters to avoid unnecessary transformations
6. **Event Naming**: Use clear, domain-specific event names
7. **Versioning**: Consider event schema versioning for evolving systems

## Common Use Cases

- **Analytics Pipeline**: Transform user interactions into analytics events
- **Domain Events**: Convert generic events to business domain events  
- **Monitoring**: Transform application events into monitoring/alerting events
- **Integration**: Convert events for external system integration
- **State Machine**: Transform events based on current system state
- **A/B Testing**: Create different event streams for testing variants

## Troubleshooting

### Missing Transformations
- Verify event type matching in `.on()` clauses
- Check that transformation functions return correct types
- Ensure broadcasted events are subscribed to by other bridges

### Performance Issues
- Use async transformations for I/O operations
- Cache frequently accessed external data
- Consider batch processing for high-volume transformations

### Data Quality
- Validate transformed data with Pydantic models
- Add logging to track transformation success/failure rates
- Monitor for missing or corrupted event data

This pattern is essential for building event-driven systems that adapt events to different processing contexts.