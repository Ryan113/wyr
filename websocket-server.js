const WebSocket = require("ws");
const fs = require("fs");

const wss = new WebSocket.Server({ port: 8080 });
const dbFilePath = "./db.json"; // Replace this with the actual path to your db.json file.

wss.on("connection", (ws) => {
  console.log("Client connected");

  fs.readFile(dbFilePath, "utf8", (err, data) => {
    if (!err) {
      ws.send(data);
    }
  });

  const watcher = fs.watch(dbFilePath, (eventType) => {
    if (eventType === "change") {
      fs.readFile(dbFilePath, "utf8", (err, data) => {
        if (!err) {
          ws.send(data);
        }
      });
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    watcher.close();
  });
});
