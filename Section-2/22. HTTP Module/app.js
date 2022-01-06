const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("hello world");
    res.end();
  }
  if (req.url === "/api/data") {
    let json = JSON.stringify([1, 2, 3]);
    res.write(json);
    res.end();
  }
});

server.listen(3000);

console.log("Server listing on port: 3000");
