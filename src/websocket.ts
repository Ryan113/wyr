// websocket.ts
const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
  console.log('WebSocket connected');
};

ws.onmessage = (event) => {
  console.log("WebSocket message received: " + event.data);
  // You can dispatch Redux actions here if needed
};

export default ws;
