const banner = document.getElementById("expandable-banner");
const actionArea = document.getElementById("action-area");
const aside = document.getElementById("aside");
const video = document.getElementById("video");
const registerExit = document.getElementById("register-exit");
const linkExit = document.getElementById("exit-area");

let isExpanded = false;
let mouseOver = false;

function expandStartHandler() {
  aside.classList.add("aside--expanded");
  setTimeout(() => {
    video.play();
  }, 300);
  Enabler.finishExpand();
}

function expandFinishHandler() {
  isExpanded = true;
}

function collapseStartHandler() {
  aside.classList.remove("aside--expanded");
  video.pause();
  video.currentTime = 0;
  video.load();
  Enabler.finishCollapse();
}

function collapseFinishHandler() {
  isExpanded = false;
}

function actionClickHandler() {
  isExpanded ? Enabler.requestCollapse() : Enabler.requestExpand();
}

// expand event listeners
Enabler.addEventListener(
  studio.events.StudioEvent.EXPAND_START,
  expandStartHandler
);
Enabler.addEventListener(
  studio.events.StudioEvent.EXPAND_FINISH,
  expandFinishHandler
);
Enabler.addEventListener(
  studio.events.StudioEvent.COLLAPSE_START,
  collapseStartHandler
);
Enabler.addEventListener(
  studio.events.StudioEvent.COLLAPSE_FINISH,
  collapseFinishHandler
);
actionArea.addEventListener("click", actionClickHandler, false);
actionArea.addEventListener(
  "mouseenter",
  () => {
    if (!mouseOver) actionClickHandler();
    mouseOver = true;
  },
  false
);
banner.addEventListener(
  "mouseleave",
  () => {
    if (mouseOver) actionClickHandler();
    mouseOver = false;
  },
  false
);

// Exit event listener
function registerExitHandler() {
  Enabler.exit("Register exit");
}
function linkExitHandler() {
  Enabler.exit("PDF exit");
}

registerExit.addEventListener("click", registerExitHandler, false);
linkExit.addEventListener("click", linkExitHandler, false);
