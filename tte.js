let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);

app.get("/", function(req, res) {
  // res.send("<h1>Hello world</h1>");
  res.sendFile(__dirname + "/index.html");
});

app.get("/client.js", function(req, res) {
  // res.send("<h1>Hello world</h1>");
  res.sendFile(__dirname + "/client.js");
});

http.listen(process.env.PORT || 3000, function() {
  console.log("listening on *:3000");
});

let current_player_id = 0;
io.on("connection", function(socket) {
  console.log("a user connected");
  let player_id = current_player_id++;

  io.emit("mouse connect", player_id);

  socket.on("mouse move", function(msg) {
    console.log("mouse move: " + JSON.stringify(msg));
    msg.player_id = player_id;
    io.emit("mouse move", msg);
  });
});
