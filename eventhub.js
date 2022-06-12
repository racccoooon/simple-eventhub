/**
 * The eventhub class.
 */
export class Eventhub {

    /**
     * Initialize the Eventhub.
     */
    constructor() {
        this.subscribers = {};
    }

    /**
     * Subscribes a subscriber function to a particular event type.
     * Note that anonymous functions cannot be unsubscribed.
     * @param eventClass The type of event that the provided subscriber will be notified for.
     * @param subscriber A function with one or fewer arguments that gets called when an event of the eventClass is fired.
     */
    subscribe(eventClass, subscriber) {
        const key = eventClass.name;
        this.subscribers[key] = this.subscribers[key] ?? new Set();
        this.subscribers[key].add(subscriber);
    }

    /**
     * Unsubscribes a subscriber function from the event hub.
     * Note that anonymous functions cannot be unsubscribed.
     * @param eventClass The type of event that the provided subscriber will no longer be notified for.
     * @param subscriber The subscriber function that gets unsubscribed.
     */
    unsubscribe(eventClass, subscriber) {
        this.subscribers[eventClass.name]?.delete(subscriber);
    }

    /**
     * Notifies the subscribers of that particular event type.
     * @param event The event that is being fired.
     */
    notify(event) {
        const key = event.constructor.name;
        const eventSubscribers = this.subscribers[key]?.entries() ?? [];
        for (const [subscriber] of eventSubscribers) {
            subscriber(event);
        }
    }
}

/**
 * A global instance of Eventhub.
 * @type {Eventhub}
 */
const eventhub = new Eventhub();

/**
 * The default export is a global instance of the Eventhub type.
 */
export default eventhub;
