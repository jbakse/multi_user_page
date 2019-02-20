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
let current_id = 0;
let mice = [];

io.on("connection", function(socket) {
  let id = current_id++;

  mice[id] = {
    id: id,
    x: 0,
    y: 0,
    connected: true
  };

  io.emit("mouse connect", mice[id]);

  mice.forEach(mouse => {
    if (mouse.id != id && mouse.connected) {
      socket.emit("mouse connect", mouse);
    }
  });

  socket.on("disconnect", function() {
    mice[id].connected = false;
    io.emit("mouse disconnect", mice[id]);
  });

  socket.on("mouse move", function(msg) {
    mice[id].x = msg.x;
    mice[id].y = msg.y;
    io.emit("mouse move", mice[id]);
  });
});
