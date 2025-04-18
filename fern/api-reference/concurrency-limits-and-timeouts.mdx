---
title: Concurrency and WebSocket Limits
subtitle: >-
  Learn about concurrency limits and timeouts with the Cartesia API.
---

Your account is subject to two types of rate limits: WebSocket limits and generation concurrency limits.

## Concurrency limits

We measure generation concurrency in terms of the number of unique contexts active at a given time.

- For HTTP endpoints, each request is treated as a separate context and counts toward your concurrency limit. 
- For WebSockets, a unique <code>context_id</code> defines a context—sending additional requests with the same <code>context_id</code> does not increase your concurrency usage. This is because requests to the same context are processed sequentially.

If you exceed your concurrency limit, you will receive a `429 Too Many Requests` error. You can check your concurrency limit and upgrade it on the playground at [play.cartesia.ai](https://play.cartesia.ai).

## Interpreting concurrency limits

How you interpret your concurrency limit depends on how you're using the Sonic model family.

<AccordionGroup>
  <Accordion title="Conversational use cases">
    For real-time conversational use cases, such as powering voice agents, we've found that the number of parallel conversations you can support is effectively 4X your concurrency limit. This is just a rule of thumb, and depends on the types of conversations you're supporting. You can reach out to us to discuss your specific use case.

    For example, if you have a concurrency limit of 15, you can typically support 60 parallel conversations.

  </Accordion>
  <Accordion title="Non-conversational use cases">

    For non-conversational use cases, such as generating speech in batch jobs, there is a more direct relationship between your concurrency limit and the number of parallel generations you can support.

    For example, if you have a concurrency limit of 15, you can typically support 15 parallel generations. You can use a connection pool to ensure you don't exceed your concurrency limit.

  </Accordion>
</AccordionGroup>

## WebSocket limits

<Tip> You don't need to worry about WebSocket limits if you're only using the HTTP API. </Tip>

We limit the number of parallel WebSocket connections to 10X your concurrency limit. For example, if you have a concurrency limit of 15, you can have up to 150 parallel WebSocket connections.

If you exceed your WebSocket limit, you will receive a `429 Too Many Requests` error on trying to open a new WebSocket connection.

Usually, when users run into WebSocket limits (even at scale), it's because they're not properly closing idle connections. Beyond closing idle connections, you can also create a connection pool to ensure you don't exceed your WebSocket limit.

## WebSocket timeouts

We close idle WebSocket connections after 5 minutes. We recommend closing and re-opening a new websocket connection when connections stay idle longer than 5 minutes.
