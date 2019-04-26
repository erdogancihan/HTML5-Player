const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const toggleButton = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const rangeInputs = player.querySelectorAll("input[type='range']");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress-filled");
const playerCurrent=player.querySelector(".player__current");
const playerDuration=player.querySelector(".player__duration");


function togglePlay(e) {
  const method = video.paused ? "play" : "pause";
  if(e.code&& e.code!=="Space")return
  video[method]();
}
function updateButton() {
  const icon = video.paused ? "►" : "❚❚";
  toggleButton.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate(e) {
  video[this.name] = this.value;
  const root=document.documentElement;
 this.dataset.content=this.value;
// root.style.setProperty("--top",`${e.layerY}px`)
 root.style.setProperty("--left",`${e.layerX}px`)

}
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = percent + "%";
  playerCurrent.innerText=`${Math.round(video.currentTime/60)}:${Math.trunc(video.currentTime%60)} `;
  playerDuration.innerText=`${Math.round(video.duration/60)}:${Math.trunc(video.duration%60)} `;
  
}
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

//Hook event listeners
video.addEventListener("click", togglePlay);
toggleButton.addEventListener("click", togglePlay);
window.addEventListener("keydown", togglePlay);


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
