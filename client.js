console.log("Hello, client.js");
/*global io*/
var socket = io();

document.onmousemove = e => {
  let mLoc = { x: e.clientX, y: e.clientY };
  //   console.log(mLoc);
  socket.emit("mouse move", mLoc);
};

socket.on("mouse move", function(mLoc) {
  let el = document.getElementById(`player-${mLoc.player_id}`);
  el.style.left = mLoc.x + "px";
  el.style.top = mLoc.y + "px";
});
