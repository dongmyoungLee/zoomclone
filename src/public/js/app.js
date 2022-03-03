const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

// 서버로의 연결
const frontSocket = new WebSocket(`ws://${window.location.host}`);

frontSocket.addEventListener("open", () => {
  console.log("서버 연결 완료");
});

frontSocket.addEventListener("message", (message) => {
  console.log("새로온 메시지 : ", message.data);
});

frontSocket.addEventListener("close", () => {
  console.log("서버 끊김");
});

function handleSubmit(e) {
  e.preventDefault();
  const input = messageForm.querySelector("input");
  frontSocket.send(input.value);
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
