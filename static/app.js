const settings = document.querySelector(".settings");
const playButton = document.querySelector("#playStop");
const click = document.querySelector("#metronomeClick");
const timeDisplay = document.querySelector(".time-display");
const fractionCount = document.querySelectorAll(".interval-fraction");
const timeBarDisplay = document.querySelector(".time-bar-display");
let bpmStart = 0;
let bpmEnd = 0;
let duration = 0;
let pivots = 0;
let pivotPoint = 0;
let currentPivotPointDiff = 0;
let currentTempo = 0;
let nowPlaying = false;

// listen for bpm and duration settings
settings.addEventListener("click", () => {
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
});

playButton.addEventListener("click", () => {
  startPlayback();
  timeBar();
});

function startPlayback() {
  click.play();
  let n = 0;
  let pivotFraction = 1;
  let start = new Date().getTime();
  let overallClock = new Date().getTime();
  let fractionCheck = true;
  let firstCheck = false;
  const metronome = setInterval(() => {
    if (new Date().getTime() - start >= currentTempo) {
      click.play();
      // console.log(new Date().getTime() - start);
      start = new Date().getTime();
    }
    if (fractionCheck) {
      timeDisplay.innerHTML += `<li class="interval-fraction">${n}</li>`;
      fractionCheck = false;
    } else if (!fractionCheck) {
      pivotFraction = timeDisplay.childNodes.length;
      // console.log(timeDisplay.childNodes.length);
    }
    if (new Date().getTime() - overallClock >= pivotPoint) {
      firstCheck = true;
    }
    if (new Date().getTime() - overallClock >= pivotPoint * n && firstCheck) {
      currentTempo -= beatDiff / pivotFraction;
      n += 1;
      console.log("----------", n);
      console.log("current tempo: ", currentTempo);
      console.log("pivot count: ", n);
      console.log("BPM end: ", bpmEnd);
      console.log("current pivot point: ", pivotPoint - currentPivotPointDiff);
      console.log("current pivot diff: ", currentPivotPointDiff);
      console.log("beat difference: ", beatDiff);
      console.log("time elapsed: ", new Date().getTime() - overallClock);
    }
    if (currentTempo <= bpmEnd) {
      clearInterval(metronome);
    }
  }, 10);
}

function timeBar() {
  let timeBarCheck = new Date().getTime();
  let timeBarQue = (settings.duration.value * 60000) / 50;
  let k = 1;
  setInterval(() => {
    if (new Date().getTime() - timeBarCheck >= timeBarQue * k) {
      timeBarDisplay.innerHTML += `<div class="time-bar-marker"></div>`;
      k += 1;
    }
    console.log(timeBarQue);
  }, 10);
}
