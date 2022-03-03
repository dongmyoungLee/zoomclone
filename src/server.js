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

wss.on("connection", (backSocket) => {
  console.log("브라우저 연결 완료");
  backSocket.on("close", () => console.log("브라우저 끊김"));

  backSocket.on("message", (message) => {
    backSocket.send(message.toString());
  });

  backSocket.send("hi!!!!!!!!!!!!!!!!!!!!!!");
});

server.listen(3000, handleListen);
