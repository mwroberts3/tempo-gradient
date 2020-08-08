const settings = document.querySelector(".settings");
const playButton = document.querySelector("#playStop");
const click = document.querySelector("#metronomeClick");
let nowPlaying = false;

// listen for bpm and duration settings
settings.addEventListener("keyup", () => {
  let bpmStart = settings.tempostart.value;
  let bpmEnd = settings.tempoend.value;
  let duration = settings.duration.value;
  console.log(
    "tempo-start: ",
    bpmStart,
    "tempo-end: ",
    bpmEnd,
    "duration: ",
    duration
  );

  playButton.addEventListener("click", () => {
    startPlayback(bpmStart);
  });
});

function startPlayback(bpmStart) {
  setInterval(() => {
    click.play();
  }, 60000 / bpmStart);
}
