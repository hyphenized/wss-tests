const ws = new WebSocket(`ws://localhost:3000`);

const generateDate = () => {
  return new Date().toLocaleTimeString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });
};

const log = document.getElementById("log");

// Messages sent by me
document.querySelector("button").onclick = () => {
  let text = document.getElementById("text").value;
  ws.send(text);
  log.innerHTML += generateDate() + " You: " + text + "<br>";
};

ws.onmessage = (event) => {
  log.innerHTML += generateDate() + " " + event.data + "<br>";
};

ws.onerror = (error) => {
  console.log("Server error message: ", error.message);
};
