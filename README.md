# simple-eventhub

A simple type based eventhub for js projects.

## installation

`npm install raccoon-eventhub`

## usage

First you create your event classes.
These should model the event and its data.
For example:
```js
export class LoginEvent {
  constructor(username) {
    this.username = username;
  }
}

export class LogoutEvent {}
```

Then you import the eventhub. This is as simple as:
```js
import eventhub from "raccoon-eventhub";
```

This example uses the default export from "raccoon-eventhub" which is a shared instance of the Eventhub.
It is also possible to instantiate your new local eventhub instances:
```js
import { EventHub } from "raccoon-eventhub";

let localEventhub = new EventHub();
```

To subscribe to events simply provide the type of the event and a function with one argument (the event) or fewer.
The function is the subscriber callback and will be executed when an event of the specified type was fired.
Note that anonymous functions cannot be unsubscribed.
Like so:
```js
function onLogin(evt){...}

eventhub.subscribe(LoginEvent, onLoginEvent);
```

To unsubscribe simple call the unsubscribe method on the eventhub with the event type and subscriber function used in the subscribe method above:
```js
eventhub.unsubscribe(LoginEvent, onLoginEvent);
```

Finally to fire an event and notify all subscribers of that event type on that eventhub simply call the *notify* function on the eventhub instance.
Like so:
```js
eventhub.notify(new LoginEvent("Darkarotte"));
```

## license

MIT
