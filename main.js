const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const toggleButton = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const rangeInputs = player.querySelectorAll("input[type='range']");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress-filled");

function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}
function updateButton() {
  const icon = video.paused ? "►" : "❚❚";
  toggleButton.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate() {
  video[this.name] = this.value;
}
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = percent + "%";
}
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

//Hook event listeners
video.addEventListener("click", togglePlay);
toggleButton.addEventListener("click", togglePlay);

video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

skipButtons.forEach(skipButton => skipButton.addEventListener("click", skip));
rangeInputs.forEach(rangeInput =>
  rangeInput.addEventListener("change", handleRangeUpdate)
);
rangeInputs.forEach(rangeInput =>
  rangeInput.addEventListener("mousemove", handleRangeUpdate)
);

let mouseDown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", e => mouseDown && scrub(e));
progress.addEventListener("mousedown", () => (mouseDown = true));
progress.addEventListener("mouseup", () => (mouseDown = false));
