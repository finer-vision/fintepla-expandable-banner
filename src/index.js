const banner = document.getElementById("expandable-banner");
const actionArea = document.getElementById("action-area");
const aside = document.getElementById("aside");
const video = document.getElementById("video");
const videoControls = document.getElementById("video-controls");
const registerExit = document.getElementById("register-exit");
const linkExit = document.getElementById("exit-area");

// Video play / pause / mute / unmute
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const mutedButton = document.getElementById("muted");
const unmutedButton = document.getElementById("unmuted");

let isExpanded = false;
let mouseOver = false;
let videoPlaying = false;
let intialPlay = false;

function expandStartHandler() {
  aside.classList.add("aside--expanded");
  Enabler.finishExpand();
}

function expandFinishHandler() {
  isExpanded = true;
}

function collapseStartHandler() {
  mouseOver = false;
  videoPlaying = false;
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

// Video
if (!videoPlaying && !intialPlay) {
  playButton.classList.add("opacity-1");
}

function playVideo() {
  initialPlay = true;
  if (videoPlaying) {
    video.pause();
    pauseButton.classList.add("opacity-1");
    playButton.classList.remove("opacity-1");
    videoPlaying = false;
  } else {
    video.play();
    playButton.classList.add("opacity-1");
    pauseButton.classList.remove("opacity-1");
    videoPlaying = true;
  }
}
video.addEventListener("click", playVideo, false);

function showControls() {
  if (videoPlaying) {
    playButton.classList.add("opacity-1");
  } else if (videoPlaying) {
    pauseButton.classList.add("opacity-1");
  }
  if (muted) {
    mutedButton.classList.add("opacity-1");
  } else {
    unmutedButton.classList.add("opacity-1");
  }
}
function hideControls() {
  if (videoPlaying && initialPlay) {
    playButton.classList.remove("opacity-1");
    pauseButton.classList.remove("opacity-1");
  }
  mutedButton.classList.remove("opacity-1");
  unmutedButton.classList.remove("opacity-1");
}
video.addEventListener("mouseenter", showControls, false);
video.addEventListener("mouseleave", hideControls, false);

let muted = false;
function handleVolume(e) {
  e.stopPropagation();
  if (muted) {
    unmutedButton.classList.add("opacity-1");
    mutedButton.classList.remove("opacity-1");
    video.muted = false;
    muted = false;
  } else {
    mutedButton.classList.add("opacity-1");
    unmutedButton.classList.remove("opacity-1");
    video.muted = true;
    muted = true;
  }
}
mutedButton.addEventListener("click", handleVolume, false);
unmutedButton.addEventListener("click", handleVolume, false);
unmutedButton.addEventListener("mouseenter", showControls, false);

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
if (isSafari) {
  video.setAttribute("controls", true);
  videoControls.style.display = "none";
}
