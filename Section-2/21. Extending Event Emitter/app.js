const EventEmitter = require("events");

const Logger = require("./logger");
let logger = new Logger();

// Register a listener
logger.on("messageLogged", (param) => {
  console.log("Listener called", param);
});

logger.log("message");
