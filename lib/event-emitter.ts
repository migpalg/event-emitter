import { IEventEmitter, EventListener, DEFAULT_MAX_LISTENERS } from "./types";

/**
 * Class that implements the IEventEmitter interface. It allows to subscribe to
 * events, unsubscribe from events and emit events. It is generic and allows to
 * specify the type of the event data.
 */
export class EventEmitter<EventMap = unknown>
  implements IEventEmitter<EventMap>
{
  private maxListeners: number = DEFAULT_MAX_LISTENERS;

  // Map of event names to a set of listeners
  private listeners: Map<
    keyof EventMap,
    Set<EventListener<EventMap[keyof EventMap]>>
  > = new Map();

  on<EventName extends keyof EventMap>(
    eventName: EventName,
    listener: EventListener<EventMap[EventName]>
  ): () => void {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }

    if (this.listeners.get(eventName)!.size >= this.maxListeners) {
      // TODO: use a logger instead of console
      // TODO: use a custom error class with custom error codes
      console.warn(
        "Possible EventEmitter memory leak detected. " +
          `${this.maxListeners} ${eventName as string} listeners added.` +
          "Use emitter.setMaxListeners() to increase limit"
      );
    }

    const listeners = this.listeners.get(eventName) as Set<
      EventListener<EventMap[EventName]>
    >;

    listeners.add(listener);

    return () => {
      this.off(eventName, listener);
    };
  }

  once<EventName extends keyof EventMap>(
    eventName: EventName,
    listener: EventListener<EventMap[EventName]>
  ): void {
    const off = this.on(eventName, (data) => {
      listener(data);
      off();
    });
  }

  off<EventName extends keyof EventMap>(
    eventName: EventName,
    listener: EventListener<EventMap[EventName]>
  ): void {
    if (!this.listeners.has(eventName)) {
      return;
    }

    const listeners = this.listeners.get(eventName) as Set<
      EventListener<EventMap[EventName]>
    >;

    listeners.delete(listener);
  }

  emit<EventName extends keyof EventMap>(
    eventName: EventName,
    data: EventMap[EventName]
  ): void {
    if (!this.listeners.has(eventName)) {
      return;
    }

    const listeners = this.listeners.get(eventName) as Set<
      EventListener<EventMap[EventName]>
    >;

    listeners.forEach((listener) => listener(data));
  }

  getMaxListeners(): number {
    return this.maxListeners;
  }

  setMaxListeners(maxListeners: number): void {
    if (typeof maxListeners !== "number" || maxListeners < 1) {
      throw new Error("maxListeners must be a positive number");
    }

    this.maxListeners = maxListeners;
  }
}
