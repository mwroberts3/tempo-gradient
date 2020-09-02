function startPlayback(n, start, overallClock, firstCheck) {
  const metronome = setInterval(() => {
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
    if (new Date().getTime() - overallClock >= pivotPoint) {
      firstCheck = true;
    }
    if (new Date().getTime() - overallClock >= pivotPoint * n && firstCheck) {
      currentTempo -= beatDiff;
      n += 1;
    }

    // debugHelper(n);

    // LOOP CHECK AFTER TIME IS UP
    if (currentTempo <= bpmEnd) {
      if (loopCheck) {
        n = 0;
        start = new Date().getTime();
        overallClock = new Date().getTime();
        firstCheck = false;
        currentTempo = 60000 / (60000 / bpmStart);
        console.log("is this working?");
      } else {
        clearInterval(metronome);
      }
    }
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
