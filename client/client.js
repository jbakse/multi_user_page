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
  el.style.left = mLoc.x - 30 + "px";
  el.style.top = mLoc.y - 50 + "px";
});

socket.on("mouse connect", function(player_id) {
  console.log("mouse connect");
  let el = document.createElement("div");
  el.classList.add("player-cursor");
  el.id = `player-${player_id}`;
  el.innerText = `player-${player_id}`;
  el.style.left = 0;
  el.style.top = 0;
  document.body.appendChild(el);
});
