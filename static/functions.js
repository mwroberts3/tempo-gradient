function startPlayback() {
  let start = new Date().getTime();
  const metronome = setInterval(() => {
    console.log(currentTempo);
    if (new Date().getTime() - start >= currentTempo) {
      if (beatCheck) {
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
      start = new Date().getTime();
    }

    // LOOP CHECK AFTER TIME IS UP
    if (currentTempo <= bpmEnd && !regMetro) {
      if (loopCheck) {
        start = new Date().getTime();
        currentTempo = bpmStart;
      } else {
        clearInterval(metronome);
      }
    }

    currentTempo -= beatDiff;
  }, 10);
}

function timeBar(duration) {
  let timeBarCheck = new Date().getTime();
  let timeBarQue = duration / 50;
  let k = 1;
  const timeBarConst = setInterval(() => {
    if (new Date().getTime() - timeBarCheck >= timeBarQue * k) {
      timeBarDisplay.innerHTML += `<div class="time-bar-marker"></div>`;
      k += 1;
    }
    if (k > 50 && !loopCheck) {
      clearInterval(timeBarConst);
      setTimeout(() => {
        location.reload();
      }, 3000);
    } else if (k > 50 && loopCheck) {
      k = 1;
      timeBarCheck = new Date().getTime();
      timeBarDisplay.innerHTML = ``;
    }
  }, 10);
}
