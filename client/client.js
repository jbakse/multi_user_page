console.log("Hello, client.js");
/*global io*/
var socket = io();

document.onmousemove = e => {
  let mLoc = { x: e.clientX, y: e.clientY };
  //   console.log(mLoc);
  socket.emit("mouse move", mLoc);
};

socket.on("mouse move", function(mouse) {
  let el = document.getElementById(`player-${mouse.id}`);
  el.style.left = mouse.x - 30 + "px";
  el.style.top = mouse.y - 50 + "px";
});

socket.on("mouse connect", function(mouse) {
  console.log("mouse connect", mouse);
  let el = document.createElement("div");
  el.classList.add("player-cursor");
  el.id = `player-${mouse.id}`;
  el.innerText = `player-${mouse.id}`;
  el.style.left = mouse.x - 30 + "px";
  el.style.top = mouse.y - 50 + "px";
  document.body.appendChild(el);
});

socket.on("mouse disconnect", function(mouse) {
  console.log("mouse disconnect", mouse);
  let el = document.getElementById(`player-${mouse.id}`);
  el.remove();
});
