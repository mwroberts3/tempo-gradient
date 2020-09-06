const settings = document.querySelector(".settings");
const playButton = document.querySelector("#playStop");
const click = document.querySelector("#metronomeClick");
const timeDisplay = document.querySelector(".time-display");
const timeBarDisplay = document.querySelector(".time-bar-display");
const playBackOptions = document.querySelector(".playback-options");
const clickSound = document.getElementById("click-sound");
const clickSoundFile = document.getElementById("metronomeClick");
const soundSelect = document.querySelector(".sound-select");
let bpmStart = 0;
let bpmEnd = 0;
let duration = 0;
let currentTempo = 0;
let nowPlaying = false;
let beatOne = document.querySelector("#beatOne");
let beatTwo = document.querySelector("#beatTwo");
let beatOnKick = true;
let loopCheck = false;
let beatCheck = false;
let regMetro = false;

// SOUND SELECT
soundSelect.addEventListener("click", (e) => {
  const soundOptions = Array.from(soundSelect.children);

  if (e.target.classList.contains("popout-btn")) {
    soundOptions.forEach((option) =>
      option.classList.remove("option-selected")
    );
    e.target.classList.add("option-selected");
  }

  if (e.target.classList.contains("click-btn")) {
    clickSoundFile.src = "static/click2.wav";
  } else if (e.target.classList.contains("drum-btn")) {
    clickSoundFile.src = "static/drum2.wav";
  } else if (e.target.classList.contains("woodblock-btn")) {
    clickSoundFile.src = "static/woodBlock2.wav";
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
  } else if (
    e.target.classList.contains("loop-option") &&
    e.target.classList.contains("option-selected")
  ) {
    e.target.classList.toggle("option-selected");
    loopCheck = false;
  }

  if (
    e.target.classList.contains("beat-option") &&
    !e.target.classList.contains("option-selected")
  ) {
    e.target.classList.toggle("option-selected");
    beatCheck = true;
  } else if (
    e.target.classList.contains("beat-option") &&
    e.target.classList.contains("option-selected")
  ) {
    e.target.classList.toggle("option-selected");
    beatCheck = false;
  }
});

// TEMPO INPUT & PLAYBACK INIT
settings.playStop.addEventListener("click", (e) => {
  bpmStart = settings.tempostart.value;
  bpmEnd = settings.tempoend.value;
  duration = settings.duration.value;

  console.log(e);
  settings.playStop.nextElementSibling.classList.remove("fa-play");
  settings.playStop.nextElementSibling.classList.add("fa-stop");

  if (bpmStart && bpmEnd && duration) {
    duration *= 60000;
    currentTempo = 60000 / bpmStart;
    bpmEnd = 60000 / bpmEnd;
    bpmStart = 60000 / bpmStart;
    beatDiff = (bpmStart - bpmEnd) / (duration / 10);
    // convert bpmEnd to milliseconds so interval can clear when target bpm is reached

    console.log(
      "duration: ",
      duration,
      "current tempo:",
      currentTempo,
      "beat diff: ",
      beatDiff
    );
  } else if (bpmStart) {
    beatDiff = 0;
    currentTempo = 60000 / bpmStart;
    bpmEnd = currentTempo;
    regMetro = true;
    console.log("beat diff:", beatDiff);
    console.log("current tempo:", currentTempo);
  }
  if (!nowPlaying && !regMetro) {
    playButton.blur();
    playButton.value = "reset";
    nowPlaying = true;
    startPlayback();
    timeBar(duration);
  } else if (!nowPlaying && regMetro) {
    playButton.blur();
    playButton.value = "reset";
    settings.tempoend.value = settings.tempostart.value;
    settings.duration.value = "00";
    nowPlaying = true;
    startPlayback();
  } else {
    location.reload();
  }
});
