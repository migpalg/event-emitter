export const DEFAULT_MAX_LISTENERS = 10;

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
   * Subscribe to an event and unsubscribe after the first call
   * @param eventName target event name
   * @param listener callback function
   */
  once<EventName extends keyof EventMap>(
    eventName: EventName,
    listener: EventListener<EventMap[EventName]>
  ): void;

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

  /**
   * Get the number of listeners for an event
   * @param eventName target event name
   */
  listenerCount<EventName extends keyof EventMap>(eventName: EventName): number;

  /**
   * Remove all listeners for an event
   * @param eventName target event name
   */
  removeAllListeners<EventName extends keyof EventMap>(
    eventName: EventName
  ): void;

  /**
   * Get the list of event names that have listeners
   */
  eventNames(): Array<keyof EventMap>;

  /**
   * Get the number of listeners for the events
   */
  getMaxListeners(): number;

  /**
   * Set the maximum number of listeners for the events
   * @param maxListeners maximum number of listeners for an event
   * @throws if the maximum number of listeners is less than 1
   */
  setMaxListeners(maxListeners: number): void;
}
