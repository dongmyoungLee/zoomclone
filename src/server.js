import express from "express";
import { Http2ServerResponse } from "http2";
import path from "path";
import http from "http";
import Websocket, { WebSocketServer } from "ws";

const __dirname = path.resolve();

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/src/views");
app.use("/public", express.static(__dirname + "/src/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log("Listening on http://localhost:3000");

//http server
const server = http.createServer(app);

//Websocket server -> http 서버위에 만든 것 -> 2개의 protocol 같은 port 를 공유함
const wss = new WebSocketServer({ server });

const sockets = [];

wss.on("connection", (backSocket) => {
  sockets.push(backSocket);
  backSocket["nickname"] = "익명";

  console.log("브라우저 연결 완료");

  // forEach로 돌렸기 때문에 crome 에서도 ff 에서도 다 같이 주고 받을 수 있음
  backSocket.on("message", (msg) => {
    const message = JSON.parse(msg);

    switch (message.type) {
      case "new_message":
        sockets.forEach((aSocket) =>
          aSocket.send(`${backSocket.nickname} : ${message.payload}`)
        );

      case "nickname":
        backSocket["nickname"] = message.payload;
    }
  });

  backSocket.on("close", () => console.log("브라우저 끊김"));
});

server.listen(3000, handleListen);
