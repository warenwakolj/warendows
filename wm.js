let highestZIndex = 1;
let lowestZIndex = 0;

toggleWindow('welcomewindow')

function bringToFront(window) {
  highestZIndex++;
  window.style.zIndex = highestZIndex;
}

function sendToBack(window) {
  lowestZIndex--;
  window.style.zIndex = lowestZIndex;
}

document.querySelectorAll(".window").forEach(window => {
  window.addEventListener("mousedown", () => bringToFront(window));
});

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "title-bar")) {
    document.getElementById(elmnt.id + "title-bar").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    bringToFront(elmnt);
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    var titleBar = elmnt.querySelector(".title-bar");
    var titleBarHeight = titleBar.offsetHeight;
    var cursorYRelativeToTitleBar = e.clientY - titleBar.getBoundingClientRect().top;
    if (cursorYRelativeToTitleBar <= titleBarHeight) {
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

document.querySelectorAll(".window").forEach(window => {
  dragElement(window);
});

function closeWindow(windowId) {
  var window = document.getElementById(windowId);
  window.classList.remove("opened");
  window.classList.add("closing");

  setTimeout(() => {
    sendToBack(window); 
    window.style.display = "none";
    window.classList.remove("closing");
  }, 300); 
  window.classList.add("closed");
}

function openWindow(windowId) {
  var window = document.getElementById(windowId);
  window.classList.remove("closing");
  window.style.display = "block";
  void window.offsetWidth;
  window.classList.add("opened");
  bringToFront(window);
}

function toggleWindow(windowId) {
  var window = document.getElementById(windowId);
  if (window.style.display === "block") {
    closeWindow(windowId);
  } else {
    openWindow(windowId);
  }
}
