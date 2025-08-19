# Chained Processing

Chained processing lets you transform data through sequential route operations.

## Pattern Overview

This pattern:
- **Sequential Operations**: Chain multiple transformations
- **Data Validation**: Filter and validate data at each step
- **Conditional Logic**: Route data based on conditions
- **Pipeline Composition**: Build reusable components

## Key Components

### Routes
- **`map()`**: Transform data through functions
- **`filter()`**: Conditionally continue processing  
- **`stream()`**: Process generators that yield multiple values
- **Pipeline Chaining**: Link operations for complex workflows

### Processing Functions
- **Pure Functions**: Transform data without side effects
- **Async Support**: Handle I/O operations in the pipeline
- **Error Handling**: Graceful failure handling at each step
- **Type Safety**: Maintain type consistency through transformations

## Basic Example

```python
# Multi-step form processing pipeline
(
    bridge.on(FormSubmitted)
    .map(parse_form_data)
    .filter(lambda form: form.is_complete)
    .map(validate_fields)
    .filter(lambda form: form.is_valid)
    .map(calculate_totals)
    .map(generate_confirmation)
    .broadcast(FormProcessed)
)

# Helper functions for each step
def parse_form_data(message):
    raw_data = message.event.form_data
    return FormData(
        name=raw_data.get('name'),
        email=raw_data.get('email'),
        items=raw_data.get('items', [])
    )

def validate_fields(form):
    form.errors = []
    
    if not form.name:
        form.errors.append("Name is required")
    if not is_valid_email(form.email):
        form.errors.append("Invalid email format")
        
    form.is_valid = len(form.errors) == 0
    return form

def calculate_totals(form):
    form.subtotal = sum(item.price for item in form.items)
    form.tax = form.subtotal * 0.08
    form.total = form.subtotal + form.tax
    return form
```

## Advanced Chaining Patterns

### Conditional Routing

```python
# Route based on computed properties
def classify_priority(request):
    if request.amount > 10000:
        request.priority = "high"
    elif request.urgency == "critical":
        request.priority = "high" 
    else:
        request.priority = "normal"
    return request

(
    bridge.on(CustomerRequest)
    .map(enrich_customer_data)
    .map(classify_priority)
    .filter(lambda req: req.priority == "high")
    .map(escalate_to_manager)
    .broadcast(HighPriorityRequest)
)

# Parallel processing for different conditions
(
    bridge.on(CustomerRequest)
    .map(classify_priority)
    .filter(lambda req: req.priority == "normal")
    .map(handle_standard_request)
    .broadcast(StandardRequest)
)
```

### Multi-Stage Validation

```python
async def validate_customer_info(data):
    # Database lookup
    customer = await db.get_customer(data.customer_id)
    if not customer:
        data.errors.append("Customer not found")
        return data
        
    # Credit check
    credit_score = await credit_api.get_score(customer.ssn)
    data.credit_approved = credit_score > 650
    
    return data

async def validate_inventory(data):
    # Check product availability
    for item in data.items:
        available = await inventory.check_stock(item.product_id)
        if available < item.quantity:
            data.errors.append(f"Insufficient stock for {item.name}")
    
    return data

# Chain async validations
(
    bridge.on(OrderRequest)
    .map(validate_customer_info)
    .filter(lambda order: len(order.errors) == 0)
    .map(validate_inventory)  
    .filter(lambda order: len(order.errors) == 0)
    .map(process_payment)
    .broadcast(OrderConfirmed)
)
```

### Stream Processing Chains

```python
# Process collections with chaining
async def analyze_conversation_chunks(context):
    """Generator that yields analysis for each sentence."""
    transcript = context.get_full_transcript()
    sentences = split_into_sentences(transcript)
    
    for sentence in sentences:
        sentiment = await analyze_sentiment(sentence)
        entities = extract_entities(sentence)
        
        yield SentenceAnalysis(
            text=sentence,
            sentiment=sentiment,
            entities=entities
        )

def aggregate_insights(analysis):
    """Combine sentence analyses into conversation insights."""
    return ConversationInsight(
        overall_sentiment=calculate_overall_sentiment(analysis.sentiment),
        key_entities=analysis.entities,
        conversation_type=classify_conversation(analysis)
    )

# Chain streaming with aggregation
(
    bridge.on(UserStoppedSpeaking)
    .stream(analyze_conversation_chunks)  # Yields multiple analyses
    .map(aggregate_insights)              # Each analysis aggregated
    .filter(lambda insight: insight.confidence > 0.8)
    .broadcast(ConversationInsight)
)
```

## Error Handling in Chains

```python
def safe_transform(transform_func):
    """Wrapper to handle errors in pipeline steps."""
    def wrapper(data):
        try:
            return transform_func(data)
        except Exception as e:
            logger.error(f"Transform error: {e}")
            data.errors = getattr(data, 'errors', [])
            data.errors.append(f"Processing error: {str(e)}")
            return data
    return wrapper

# Apply error handling to pipeline
(
    bridge.on(DataSubmission)
    .map(safe_transform(parse_input))
    .filter(lambda d: not getattr(d, 'errors', []))
    .map(safe_transform(validate_business_rules))
    .filter(lambda d: not getattr(d, 'errors', []))
    .map(safe_transform(enrich_with_external_data))
    .broadcast(ProcessedData)
)
```

## Early Exit Pattern

```python
def should_stop_processing(data):
    """Determine if processing should stop early."""
    return (
        data.status == "completed" or 
        data.error is not None or
        data.user_cancelled
    )

(
    bridge.on(ProcessingUpdate)
    .map(check_prerequisites)
    .exit(should_stop_processing)  # Stop here if condition met
    .map(expensive_computation)    # Only runs if exit condition false
    .map(finalize_results)
    .broadcast(ProcessingComplete)
)
```

## Reusable Pipeline Components

```python
class PipelineBuilder:
    """Helper for building reusable pipeline components."""
    
    @staticmethod
    def validation_pipeline(validators):
        """Create a validation pipeline from a list of validators."""
        def build_route(bridge_route):
            for validator in validators:
                bridge_route = bridge_route.map(validator).filter(lambda d: d.is_valid)
            return bridge_route
        return build_route
    
    @staticmethod
    def enrichment_pipeline(enrichers):
        """Create an enrichment pipeline from a list of enricher functions."""
        def build_route(bridge_route):
            for enricher in enrichers:
                bridge_route = bridge_route.map(enricher)
            return bridge_route
        return build_route

# Use reusable components
customer_validation = PipelineBuilder.validation_pipeline([
    validate_customer_id,
    validate_contact_info,
    validate_credit_status
])

data_enrichment = PipelineBuilder.enrichment_pipeline([
    add_customer_history,
    add_preferences,
    add_risk_score
])

# Compose pipelines
route = bridge.on(CustomerOnboarding)
route = customer_validation(route)
route = data_enrichment(route)
route.broadcast(CustomerReady)
```

## Best Practices

1. **Pure Functions**: Use pure functions for transformations when possible
2. **Error Boundaries**: Handle errors at appropriate pipeline stages
3. **Early Exit**: Stop processing when conditions make continuation unnecessary
4. **Type Safety**: Maintain consistent data types through the pipeline
5. **Logging**: Log important transformations for debugging
6. **Performance**: Consider async operations for I/O-bound steps
7. **Modularity**: Create reusable pipeline components

## Common Use Cases

- **Form Processing**: Multi-step validation and transformation
- **Data Enrichment**: Add context from multiple sources
- **Business Rule Engine**: Apply sequential business logic
- **Content Analysis**: Multi-stage text/voice analysis
- **Order Processing**: Complex e-commerce workflows
- **Data Migration**: Transform data through multiple stages

This pattern enables complex data processing through route composition.