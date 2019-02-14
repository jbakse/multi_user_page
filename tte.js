// import web server packages
let express = require("express");
let serveStatic = require("serve-static");

// config web server
let app = express();
app.use(serveStatic("client", { index: ["index.html"] }));

// start web server
let http = require("http").Server(app);
http.listen(process.env.PORT || 3000, function() {
  console.log("listening on *:3000");
});

// livereload web files on save
let livereload = require("livereload");
let livereloadServer = livereload.createServer();
livereloadServer.watch(__dirname + "/client");

// socket server
let io = require("socket.io")(http);
let current_player_id = 0;
io.on("connection", function(socket) {
  let player_id = current_player_id++;

  console.log(`user ${player_id} connected`);
  io.emit("mouse connect", player_id);

  socket.on("disconnect", function() {
    console.log(`user ${player_id} disconnected`);
  });

  socket.on("mouse move", function(msg) {
    // console.log("mouse move: " + JSON.stringify(msg));
    msg.player_id = player_id;
    io.emit("mouse move", msg);
  });
});
