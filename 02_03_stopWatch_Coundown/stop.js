    let timer;
    let seconds = 0;
    let running = false;

    function formatTime(sec) {
      let hrs = Math.floor(sec / 3600);
      let mins = Math.floor((sec % 3600) / 60);
      let secs = sec % 60;
      return `${hrs.toString().padStart(2,'0')}:${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
    }

    document.getElementById('startStop').addEventListener('click', () => {
      if (!running) {
        running = true;
        document.getElementById('startStop').textContent = "Stop";
        timer = setInterval(() => {
          seconds++;
          document.getElementById('stopwatch').textContent = formatTime(seconds);
        }, 1000);
      } else {
        running = false;
        document.getElementById('startStop').textContent = "Start";
        clearInterval(timer);
      }
    });

    document.getElementById('reset').addEventListener('click', () => {
      clearInterval(timer);
      running = false;
      seconds = 0;
      document.getElementById('stopwatch').textContent = "00:00:00";
      document.getElementById('startStop').textContent = "Start";
    });