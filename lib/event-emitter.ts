/**
 * Type that defines the signature of the event listener callback function. It
 * is generic and allows to specify the type of the event data.
 */
export type EventListener<T> = (data: T) => void;

/**
 * Interface that defines the methods of the EventEmitter class. It is generic
 * and allows to specify the type of the event data.
 */
export interface IEventEmitter<EventMap> {
  /**
   * Subscribe to an event
   * @param eventName target event name
   * @param listener callback function
   * @returns a function that can be called to unsubscribe from the event
   */
  on<EventName extends keyof EventMap>(
    eventName: EventName,
    listener: EventListener<EventMap[EventName]>
  ): () => void;

  /**
   * Unsubscribe from an event
   * @param eventName target event name
   * @param listener callback function
   */
  off<EventName extends keyof EventMap>(
    eventName: EventName,
    listener: EventListener<EventMap[EventName]>
  ): void;

  /**
   * Emit an event
   * @param eventName target event name
   * @param data event data to be passed to the listeners
   */
  emit<EventName extends keyof EventMap>(
    eventName: EventName,
    data: EventMap[EventName]
  ): void;
}

/**
 * Class that implements the IEventEmitter interface. It allows to subscribe to
 * events, unsubscribe from events and emit events. It is generic and allows to
 * specify the type of the event data.
 */
export class EventEmitter<EventMap = unknown>
  implements IEventEmitter<EventMap>
{
  // Map of event names to a set of listeners
  private listeners: Map<
    keyof EventMap,
    Set<EventListener<EventMap[keyof EventMap]>>
  > = new Map();

  public on<EventName extends keyof EventMap>(
    eventName: EventName,
    listener: EventListener<EventMap[EventName]>
  ): () => void {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }

    const listeners = this.listeners.get(eventName) as Set<
      EventListener<EventMap[EventName]>
    >;

    listeners.add(listener);

    return () => {
      this.off(eventName, listener);
    };
  }

  public off<EventName extends keyof EventMap>(
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

  public emit<EventName extends keyof EventMap>(
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
}
