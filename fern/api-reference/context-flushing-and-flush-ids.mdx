---
title: Context Flushing and Flush IDs
subtitle: >-
  Learn about managing multiple transcript generations with context flushing.
---

## Overview

When using [context IDs with the WebSocket API](../api-reference/contexts.mdx), all audio chunks for transcripts submitted to a single context share the same context ID. This makes it difficult to determine which audio chunks correspond to specific transcript submissions.

While this behavior works well for streaming audio, some implementations require the ability to map audio chunks back to their originating transcripts.

<Frame caption="Flushing allows you to convert N transcripts into N generators." background="subtle">
    <img src="/assets/images/api_reference_flushing.png" alt="context_flushing" />
</Frame>

## Manual Flushing

Manual flushing creates clear boundaries between transcript submissions within the same context.

### How It Works

Each time you trigger a manual flush, the system increments a `flush_id` counter. This ID is included in corresponding response audio chunk payloads, allowing you to track which transcript generated specific audio chunks.

### Implementation

To trigger a manual flush:

1. Send a request with these parameters:
   - `continue=True` (indicates you're continuing with the same context)
   - `flush=True` (triggering the flush operation)
   - Empty transcript
   - Same context ID as your previous request

### Example Flow

```
1. Submit transcript 1 on context 1
2. Flush context 1
3. Submit transcript 2 on context 1
```

In this flow:
- All audio chunks from transcript 1 will have `flush_id=1`
- The manual flush increments the ID
- All audio chunks from transcript 2 will have `flush_id=2`

## Payload Structure

Each audio chunk payload includes a `flush_id` field that serves as a transcript identifier. This ID increments with each manual flush operation, creating a clear boundary between transcript submissions.

## When to Use Manual Flushing

Consider using manual flushing when:
- You need to associate audio chunks with their originating transcripts
- Your application architecture expects a one-to-one relationship between transcripts and response streams
- You're integrating with frameworks that assume each transcript has a corresponding generator

This feature is particularly helpful when using multiple providers, as it aligns the Cartesia API with systems that expect discrete generator responses per transcript.
