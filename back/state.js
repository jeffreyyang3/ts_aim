//import { Card, Deck, Hand } from "./Cards";
const { Card, Deck, Hand } = require("./Cards");
const { Game } = require("./Game");
const { handleMove } = require("./MoveHandlers");

const fs = require("fs");
//const server = require("express")();
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 6999 }, () => {
  console.log("listening on 6999");
});

//import { Player } from "./Player";

const deck = new Deck();
const hand = new Hand();

const exampleGame = new Game({
  gameJSON: false,
  gameID: "asdf",
  playersData: ["jeff", "steven", "lyanna"].map((name) => {
    return {
      name,
      money: 100,
    };
  }),
});
let copyEx = new Game({ gameJSON: exampleGame.exportGame() });


wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    console.log(`received ${message}`);
  });
  console.log("client connected");
  socket.send(copyEx.exportToPlayer());
});



//fs.writeFile("test.json", JSON.stringify(exampleGame), () => {});
