// Event
// --- A signal that something has happened in our application or
// an event is an action or occurrence that has happened in our application, that we can respond to.
// Events are fundamental in asynchronous programming and enable handling different tasks based on specific triggers.

// Events Module
// --- It allows us to work with events in Node.js.
// The 'events' module is built into Node.js and provides the ability to create, emit, and listen for custom events.

// Node.js is built around the event-driven architecture
// --- This means that much of its core functionality revolves around emitting and responding to events.
// For example, when a file is read, or a request is received on a server, events are triggered and handled.

// Events are run synchronously
// --- By default, the listeners for an event are executed in the order they are registered.
// However, you can explicitly make certain tasks asynchronous within the listener by using `setTimeout`, `process.nextTick`, or `Promise`.

// Import the events module
const events = require('events');

// Create an instance of EventEmitter
// --- The EventEmitter class is provided by the 'events' module and is used to create and handle custom events.
const myEmitter = new events.EventEmitter();

// Register an event listener for a custom event called 'customEvent'
// --- The 'on' method is used to attach a listener to an event.
// This listener is invoked whenever the event is emitted.
myEmitter.on('netisens', (msg) => {
    console.log(`Custom event: ${msg}`);
    // --- This callback function will log a message whenever 'customEvent' is emitted.
});

myEmitter.emit('userCreated', 1276, 'John');
// Register an event listener for the 'userCreated' event
// --- The 'userCreated' event is a custom event, and here we define how to handle it.
// This listener accepts two parameters: 'id' and 'name'.
myEmitter.on('userCreated', (id, name) => {
    console.log(`A new user ${name} with ID ${id} was created`);
    // --- This will output details about the newly created user.
});

// Another listener for the same 'userCreated' event
// --- Multiple listeners can be attached to the same event.
// They will execute in the order they were added.
myEmitter.on('userCreated', (id, name) => {
    console.log(`A new user ${name} with ID ${id} was added to the database`);
    // --- This can be used for additional operations like storing user data in a database.
});

// Emit the 'customEvent' with a message
// --- The 'emit' method is used to trigger an event.
// All listeners attached to this event will execute with the provided arguments.
// myEmitter.emit('netisens', 'Avocado');
// --- This will log "Custom event: Hello, World!"

// Emit the 'userCreated' event with user details
// --- Here, the 'userCreated' event is emitted with an ID and a name as arguments.
// myEmitter.emit('userCreated', 1276, 'John');
// --- Both listeners for the 'userCreated' event will execute in sequence.

// Emit the 'userCreated' event again with the same data
// --- Events can be emitted multiple times.
// This will invoke the listeners for 'userCreated' again with the same arguments.
// myEmitter.emit('userCreated', 1276, 'John');
// --- This will result in the same output as before.
