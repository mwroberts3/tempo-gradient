const settings = document.querySelector(".settings");
const playButton = document.querySelector("#playStop");
const click = document.querySelector("#metronomeClick");
const timeDisplay = document.querySelector(".time-display");
const fractionCount = document.querySelectorAll(".interval-fraction");
const timeBarDisplay = document.querySelector(".time-bar-display");
const playBackOptions = document.querySelector(".playback-options");
const clickSound = document.getElementById("click-sound");
const clickSoundFile = document.getElementById("metronomeClick");
const soundSelect = document.querySelector(".sound-select");
let bpmStart = 0;
let bpmEnd = 0;
let duration = 0;
let pivots = 0;
let pivotPoint = 0;
let currentPivotPointDiff = 0;
let currentTempo = 0;
let nowPlaying = false;
let beatOne = document.querySelector("#beatOne");
let beatTwo = document.querySelector("#beatTwo");
let beatOnKick = true;
let loopCheck = false;
let beatCheck = false;

// SOUND SELECT
soundSelect.addEventListener("click", (e) => {
  const soundOptions = Array.from(soundSelect.children);
  soundOptions.forEach((option) => option.classList.remove("option-selected"));
  e.target.classList.add("option-selected");

  if (e.target.classList.contains("click-btn")) {
    clickSoundFile.src = "static/click.wav";
  } else if (e.target.classList.contains("drum-btn")) {
    clickSoundFile.src = "static/drum.wav";
  } else if (e.target.classList.contains("woodblock-btn")) {
    clickSoundFile.src = "static/woodBlock.wav";
  }
});

// PLAYBACK OPTIONS
playBackOptions.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("loop-option") &&
    !e.target.classList.contains("option-selected")
  ) {
    e.target.classList.toggle("option-selected");
    loopCheck = true;
    console.log(loopCheck, beatCheck);
  } else if (
    e.target.classList.contains("loop-option") &&
    e.target.classList.contains("option-selected")
  ) {
    e.target.classList.toggle("option-selected");
    loopCheck = false;
    console.log(loopCheck, beatCheck);
  }

  if (
    e.target.classList.contains("beat-option") &&
    !e.target.classList.contains("option-selected")
  ) {
    e.target.classList.toggle("option-selected");
    beatCheck = true;
    console.log(loopCheck, beatCheck);
  } else if (
    e.target.classList.contains("beat-option") &&
    e.target.classList.contains("option-selected")
  ) {
    e.target.classList.toggle("option-selected");
    beatCheck = false;
    console.log(loopCheck, beatCheck);
  }
});

// TEMPO INPUT & PLAYBACK INIT
settings.playStop.addEventListener("click", () => {
  bpmStart = settings.tempostart.value;
  bpmEnd = settings.tempoend.value;
  duration = settings.duration.value;
  console.log(
    "tempo-start: ",
    bpmStart,
    "tempo-end: ",
    bpmEnd,
    "duration: ",
    duration
  );

  if (bpmStart && bpmEnd && duration) {
    duration *= 60000;
    pivots = bpmEnd - bpmStart;
    // convert bpmEnd to milliseconds so interval can clear when target bpm is reached
    currentTempo = 60000 / bpmStart;
    bpmEnd = 60000 / bpmEnd;
    bpmStart = 60000 / bpmStart;
    pivotPoint = duration / pivots;
    beatDiff = (bpmStart - bpmEnd) / pivots;

    console.log(
      "duration: ",
      duration,
      "pivots: ",
      pivots,
      "pivotPoint: ",
      pivotPoint,
      "current tempo:",
      currentTempo,
      "beat diff: ",
      beatDiff
    );
  }
  if (!nowPlaying) {
    playButton.blur();
    playButton.value = "reset";
    nowPlaying = true;
    let n = 0;
    let start = new Date().getTime();
    let overallClock = new Date().getTime();
    let firstCheck = false;
    startPlayback(n, start, overallClock, firstCheck);
    timeBar();
  } else {
    location.reload();
  }
});
