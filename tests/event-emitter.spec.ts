import { EventEmitter } from "../lib/event-emitter";
import { expect } from "chai";
import sinon from "sinon";

type EventMap = {
  foo: string;
  bar: { name: string };
};

describe("EventEmitter unit testing", () => {
  let eventEmitter: EventEmitter<EventMap>;

  beforeEach(() => {
    eventEmitter = new EventEmitter();
  });

  it("should subscribe to an event", () => {
    const listener = sinon.spy();
    eventEmitter.on("foo", listener);
    eventEmitter.emit("foo", "bar");
    expect(listener.calledOnce).to.be.true;
  });

  it("should unsubscribe from an event", () => {
    const listener = sinon.spy();
    const unsubscribe = eventEmitter.on("foo", listener);
    unsubscribe();
    eventEmitter.emit("foo", "bar");
    expect(listener.notCalled).to.be.true;
  });

  it("should subscribe to multiple events", () => {
    const listener = sinon.spy();
    eventEmitter.on("foo", listener);
    eventEmitter.on("bar", listener);
    eventEmitter.emit("foo", "bar");
    eventEmitter.emit("bar", { name: "bar" });
    expect(listener.calledTwice).to.be.true;
  });

  it("should unsubscribe from multiple events", () => {
    const listener = sinon.spy();
    eventEmitter.on("foo", listener);
    eventEmitter.off("foo", listener);
    eventEmitter.on("bar", listener);
    eventEmitter.emit("foo", "bar");
    eventEmitter.emit("bar", { name: "bar" });
    expect(listener.calledOnce).to.be.true;
  });

  it("should not throw an error when unsubscribing from an event that does not exist", () => {
    const listener = sinon.spy();
    eventEmitter.off("foo", listener);
    expect(() => eventEmitter.off("foo", listener)).to.not.throw();
  });

  it("should return the number of listeners for an event", () => {
    eventEmitter.on("foo", () => {});
    eventEmitter.on("foo", () => {});
    eventEmitter.on("foo", () => {});
    expect(eventEmitter.listenerCount("foo")).to.equal(3);
  });

  it("should register the same listener only once", () => {
    const listener = sinon.spy();
    eventEmitter.on("foo", listener);
    eventEmitter.on("foo", listener);
    eventEmitter.on("foo", listener);
    eventEmitter.on("foo", listener);
    eventEmitter.on("foo", listener);
    eventEmitter.emit("foo", "bar");
    expect(listener.calledOnce).to.be.true;
    expect(eventEmitter.listenerCount("foo")).to.equal(1);
  });

  it("should return the list of event names that have listeners", () => {
    eventEmitter.on("foo", () => {});
    eventEmitter.on("bar", () => {});
    expect(eventEmitter.eventNames()).to.deep.equal(["foo", "bar"]);
  });

  it("should remove all listeners for an event", () => {
    const listener = sinon.spy();
    const anotherListener = sinon.spy();
    eventEmitter.on("foo", listener);
    eventEmitter.on("foo", anotherListener);
    eventEmitter.removeAllListeners("foo");
    eventEmitter.emit("foo", "bar");
    expect(listener.notCalled).to.be.true;
    expect(anotherListener.notCalled).to.be.true;
    expect(eventEmitter.listenerCount("foo")).to.equal(0);
  });
});
