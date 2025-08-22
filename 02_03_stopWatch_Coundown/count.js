    let countdown;
    let timeLeft = 0;

    function formatCountdown(sec) {
      let mins = Math.floor(sec / 60);
      let secs = sec % 60;
      return `${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
    }

    document.getElementById('startCountdown').addEventListener('click', () => {
      let minsInput = document.getElementById('minutes').value;
      if (minsInput > 0) {
        timeLeft = minsInput * 60;
        clearInterval(countdown);
        countdown = setInterval(() => {
          if (timeLeft <= 0) {
            clearInterval(countdown);
            alert("⏰ Time’s up!");
          } else {
            timeLeft--;
            document.getElementById('countdown').textContent = formatCountdown(timeLeft);
          }
        }, 1000);
      }
    });

    document.getElementById('resetCountdown').addEventListener('click', () => {
      clearInterval(countdown);
      document.getElementById('countdown').textContent = "00:00";
      document.getElementById('minutes').value = "";
    });