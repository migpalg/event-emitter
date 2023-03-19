# `@migpalg/event-emitter`

This package provides a robust implementation of the event emitter pattern, allowing developers to create and manage custom events with ease.

## 🚀 Getting started

Install this package with your favorite package manager:

```bash
pnpm install @migpalg/event-emitter
```

Then you can start using this package to create event emitters and listeners:

```js
import { EventEmitter } from "@migpalg/event-emitter";

const eventEmitter = new EventEmitter();

eventEmitter.on("test-event", ({ name }) => {
  console.log(`called event with: ${name}`);
});

eventEmitter.emit("test-evemt", { name: "John" });
```

We highly recommend using this package with typescript to describe your own set of events

```ts
import { EventEmitter } from "@migpalg/event-emitter";

export type MyEventMap = {
  push: { target: string };
};

const emitter = new EventEmitter<MyEventMap>();

emitter.emit("push", { target: "hello world!" });
```

# 🐓 API

## Class: `EventEmitter<EventMap>`

Class that implements the `IEventEmitter` interface. It allows you to subscribe to events, unsubscribe from events, and emit events. It is generic and allows you to specify the type of the event data.

### Type parameters

- `EventMap`: A mapping of event names to event data types.

### `on<EventName extends keyof EventMap>(eventName: EventName, listener: EventListener<EventMap[EventName]>): () => void`

Subscribe to an event.

- `eventName`: The target event name.
- `listener`: A callback function that will be invoked when the event is emitted. The callback function takes the event data as its only parameter.
- Returns: A function that can be called to unsubscribe from the event.

### `off<EventName extends keyof EventMap>(eventName: EventName, listener: EventListener<EventMap[EventName]>): void`

Unsubscribe from an event.

- `eventName`: The target event name.
- `listener`: The callback function that was previously subscribed to the event.

### `emit<EventName extends keyof EventMap>(eventName: EventName, data: EventMap[EventName]): void`

Emit an event.

- `eventName`: The target event name.
- `data`: The event data to be passed to the listeners. It must match the type specified in the `EventMap` for the target event.
