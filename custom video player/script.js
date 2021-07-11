const video = document.querySelector(".player__video"),
  playPauseBtn = document.querySelector(".toggle"),
  rangeSliders = document.querySelectorAll("input[type='range']"),
  forwardsBtn = document.querySelector(".forwards"),
  skipBtns = document.querySelectorAll(".skip"),
  progressFilled = document.querySelector(".progress__filled");
progressBar = document.querySelector(".progress");

/*----------  play pause video  ----------*/

playPauseBtn.addEventListener("click", toggleVideo);
video.addEventListener("click", toggleVideo);

function toggleVideo() {
  const action = video.paused ? "play" : "pause";
  video[action]();
  playPauseBtn.textContent = action == "play" ? "⏸" : "⏵︎";
}

/*----------  sliders setting  ----------*/

rangeSliders.forEach((slider) => {
  slider.addEventListener("change", setSlider);
  slider.addEventListener("mousemove", setSlider);
});

function setSlider() {
  video[this.name] = this.value;
}

/*----------  skipping through the video  ----------*/

skipBtns.forEach((btn) => btn.addEventListener("click", skipVideo));

function skipVideo() {
  video.currentTime += parseFloat(this.dataset.skip);
}
/*----------  set progress bar fill  ----------*/
video.addEventListener("timeupdate", setProgress);

let mousedown = false;
progressBar.addEventListener(
  "mousemove",
  (e) => mousedown && changeProgressOnBar(e)
);
progressBar.addEventListener("mousedown", () => (mousedown = true));
progressBar.addEventListener("mouseup", () => (mousedown = false));
progressBar.addEventListener("click", changeProgressOnBar);

function setProgress() {
  const progress = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${progress}%`;
}
function changeProgressOnBar(e) {
  const progress = (e.offsetX / progressBar.offsetWidth) * video.duration;
  video.currentTime = progress;
}
