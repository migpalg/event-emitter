# `@migpalg/event-emitter`

This package provides a robust implementation of the event emitter pattern, allowing developers to create and manage custom events with ease.

## 🚀 Getting started

Install this package with your favorite package manager:

```bash
npm install @migpalg/event-emitter
```

With yarn

```bash
yarn add @migpalg/event-emitter
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
