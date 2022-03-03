const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");

// 서버로의 연결
const frontSocket = new WebSocket(`ws://${window.location.host}`);

frontSocket.addEventListener("open", () => {
  console.log("서버 연결 완료");
});

frontSocket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

frontSocket.addEventListener("close", () => {
  console.log("서버 끊김");
});

function makeMessage(type, payload) {
  // 객체만들고 JSON으로 빼줬음.
  const msg = { type, payload };
  return JSON.stringify(msg);
}

function handleSubmit(e) {
  e.preventDefault();
  const input = messageForm.querySelector("input");
  frontSocket.send(makeMessage("new_message", input.value));
  input.value = "";
}

function handleNickSubmit(e) {
  e.preventDefault();
  const input = nickForm.querySelector("input");
  frontSocket.send(makeMessage("nickname", input.value));
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
