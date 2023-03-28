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

eventEmitter.emit("test-event", { name: "John" });
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

## ✨ Example usage

If you want to react to an action, you can use event an event emitter to trigger and respond to the target events.

```js
import { EventEmitter } from "@migpalg/event-emitter";

const target = {
  emitter: new EventEmitter(),
  count: 0,
  add() {
    this.emitter.emit('add', { sum: ++this.count })
  }
}

target.emitter.on('add', ({ sum }) => {
  // This code will update the element contents every time sum event happens
  const element document.getElementById('target-element');

  if (element) element.innerText = sum;
});

target.add();
target.add();
target.add(); // Call the listener 3 times
```

# 🐓 API

`IEventEmitter` is an interface that defines the methods of the `EventEmitter` class. This interface is generic and allows to specify the type of the event data.

## Type definitions

### EventListener

`EventListener` is a type that defines the signature of the event listener callback function. It is generic and allows to specify the type of the event data.

```typescript
export type EventListener<T> = (data: T) => void;
```

### EventMap

`EventMap` is a generic type that defines a map of event names to their corresponding event data types.

## Methods

### on

Subscribe to an event

```typescript
on<EventName extends keyof EventMap>(
  eventName: EventName,
  listener: EventListener<EventMap[EventName]>
): () => void;
```

- `eventName`: target event name.
- `listener`: callback function.
- Returns: a function that can be called to unsubscribe from the event.

### once

Subscribe to an event and unsubscribe after the first call

```typescript
once<EventName extends keyof EventMap>(
  eventName: EventName,
  listener: EventListener<EventMap[EventName]>
): void;
```

- `eventName`: target event name.
- `listener`: callback function.

### off

Unsubscribe from an event

```typescript
off<EventName extends keyof EventMap>(
  eventName: EventName,
  listener: EventListener<EventMap[EventName]>
): void;
```

- `eventName`: target event name.
- `listener`: callback function.

### emit

Emit an event

```typescript
emit<EventName extends keyof EventMap>(
  eventName: EventName,
  data: EventMap[EventName]
): void;
```

- `eventName`: target event name.
- `data`: event data to be passed to the listeners.

### getMaxListeners

Get the number of listeners for the events

```typescript
getMaxListeners(): number;
```

- Returns: the number of listeners for the events.

### setMaxListeners

Set the maximum number of listeners for the events

```typescript
setMaxListeners(maxListeners: number): void;
```

- `maxListeners`: maximum number of listeners for an event.
- Throws: if the maximum number of listeners is less than 1.
