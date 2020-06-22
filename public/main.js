const ws = new WebSocket(`ws://localhost:3000`);
let notifications = null;
const username = prompt("username", "User" + Math.floor(Math.random() * 100));
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
  const data = JSON.stringify({ username, text });
  ws.send(data);
  log.innerHTML += generateDate() + ` You :  ` + text + "<br>";
  /* Notifications */
  if (notifications == null) {
    Notification.requestPermission().then(function (result) {
      console.log(result);
      if (result == "granted") notifications = true;
    });
  }
};

ws.onmessage = (event) => {
  const { username, text } = JSON.parse(event.data);
  log.innerHTML += generateDate() + " " + username + ": " + text + "<br>";
  if (notifications) {
    new Notification("new chat msg from " + username, { body: text });
  }
};

ws.onerror = (error) => {
  console.log("Server error message: ", error.message);
};
