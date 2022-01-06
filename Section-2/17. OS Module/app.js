const os = require("os");

let totalMemory = os.totalmem();
let freeMemory = os.freemem();

console.log(`Total memory is ${totalMemory}
Free Memory is: ${freeMemory}`);
