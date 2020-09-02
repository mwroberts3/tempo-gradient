function startPlayback(n, start, overallClock, firstCheck) {
  // playBackOptions.classList.toggle("cover");
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

    // LOOP CHECK AFTER TIME IS UP
    if (currentTempo <= bpmEnd) {
      if (loopCheck) {
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
    console.log(timeBarQue);
  }, 10);
}
