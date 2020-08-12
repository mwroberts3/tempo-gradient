const settings = document.querySelector(".settings");
const playButton = document.querySelector("#playStop");
const click = document.querySelector("#metronomeClick");
const timeDisplay = document.querySelector(".time-display");
const fractionCount = document.querySelectorAll(".interval-fraction");
const timeBarDisplay = document.querySelector(".time-bar-display");
const playBackOptions = document.querySelector(".playback-options");
const clickSound = document.getElementById("click-sound");
const clickSoundFile = document.getElementById("metronomeClick");
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

clickSound.addEventListener("click", () => {
  console.log(clickSound.value);
  if (clickSound.value == "drum") {
    clickSoundFile.src = "static/drum.wav";
  } else if (clickSound.value == "woodblock") {
    clickSoundFile.src = "static/woodBlock.wav";
  } else {
    clickSoundFile.src = "static/click.wav";
  }
});

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

function startPlayback(n, start, overallClock, firstCheck) {
  // playBackOptions.classList.toggle("cover");
  const metronome = setInterval(() => {
    if (new Date().getTime() - start >= currentTempo) {
      if (settings.beat.checked) {
        if (beatOnKick) {
          beatOne.play();
          beatOnKick = false;
        } else {
          beatTwo.play();
          beatOnKick = true;
        }
      } else {
        click.play();
      }
      // console.log(new Date().getTime() - start);
      start = new Date().getTime();
    }
    if (new Date().getTime() - overallClock >= pivotPoint) {
      firstCheck = true;
    }
    if (new Date().getTime() - overallClock >= pivotPoint * n && firstCheck) {
      currentTempo -= beatDiff;
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
      if (settings.loop.checked) {
        // console.log("loop checked");
        n = 0;
        start = new Date().getTime();
        overallClock = new Date().getTime();
        firstCheck = false;
        currentTempo = 60000 / (60000 / bpmStart);
      } else {
        clearInterval(metronome);
      }
    }
    if (settings.beat.checked) {
      console.log("beat checked");
    }
  }, 10);
}

function timeBar() {
  let timeBarCheck = new Date().getTime();
  let timeBarQue = (settings.duration.value * 60000) / 50;
  let k = 1;
  const timeBarConst = setInterval(() => {
    if (new Date().getTime() - timeBarCheck >= timeBarQue * k) {
      timeBarDisplay.innerHTML += `<div class="time-bar-marker"></div>`;
      k += 1;
    }
    if (k > 50 && !settings.loop.checked) {
      clearInterval(timeBarConst);
      setTimeout(() => {
        location.reload();
      }, 3000);
    } else if (k > 50 && settings.loop.checked) {
      k = 1;
      timeBarCheck = new Date().getTime();
      timeBarDisplay.innerHTML = ``;
    }
    console.log(timeBarQue);
  }, 10);
}
