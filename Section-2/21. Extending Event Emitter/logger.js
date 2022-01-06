const EventEmitter = require("events");
const emitters = new EventEmitter();

class Logger extends EventEmitter {
  log(messages) {
    console.log(messages);

    // Raise an event
    this.emit("messageLogged", { id: 1, url: "https://www.google.com" });
  }
}

module.exports = Logger;
