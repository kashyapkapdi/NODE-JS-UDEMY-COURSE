const EventEmitter = require("events");

const emitters = new EventEmitter();

// Register a listener
emitters.on("messageLogged", (param) => {
  console.log("Listener called", param);
});

// Raise an event
emitters.emit("messageLogged", { id: 1, url: "https://www.google.com" });
