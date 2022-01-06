const EventEmitter = require("events");

const emitters = new EventEmitter();

// Register a listener
emitters.on("messageLogged", function () {
  console.log("Listener called");
});

// Raise an event
emitters.emit("messageLogged");
