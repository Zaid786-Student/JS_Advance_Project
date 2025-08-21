    const quotes = [
      "JavaScript is the language of the web and powers interactive websites.",
      "Typing speed improves with practice, patience, and persistence.",
      "A good programmer is someone who looks both ways before crossing a one way street.",
      "Success in coding comes from solving problems step by step every day.",
      "Artificial Intelligence is transforming the world at a rapid pace."
    ];

    const quoteEl = document.getElementById("quote");
    const inputEl = document.getElementById("input");
    const timeEl = document.getElementById("time");
    const wpmEl = document.getElementById("wpm");
    const accuracyEl = document.getElementById("accuracy");
    const errorsEl = document.getElementById("errors");
    const startBtn = document.getElementById("startBtn");

    let time = 60;
    let timer;
    let quote = "";
    let errors = 0;
    let charactersTyped = 0;
    let isRunning = false;

    function newQuote() {
      let randIndex = Math.floor(Math.random() * quotes.length);
      quote = quotes[randIndex];
      quoteEl.textContent = "";
      quote.split("").forEach(char => {
        const span = document.createElement("span");
        span.innerText = char;
        quoteEl.appendChild(span);
      });
    }

    function startTest() {
      if (isRunning) return;
      isRunning = true;
      inputEl.value = "";
      inputEl.disabled = false;
      inputEl.focus();
      time = 60;
      errors = 0;
      charactersTyped = 0;
      timeEl.textContent = time;
      wpmEl.textContent = 0;
      accuracyEl.textContent = 100;
      errorsEl.textContent = 0;
      newQuote();

      timer = setInterval(() => {
        if (time > 0) {
          time--;
          timeEl.textContent = time;
        } else {
          endTest();
        }
      }, 1000);
    }

    function endTest() {
      clearInterval(timer);
      inputEl.disabled = true;
      isRunning = false;

      let wordsTyped = charactersTyped / 5;
      let minutes = 1; // since test is 60 sec
      let wpm = Math.round(wordsTyped / minutes);
      wpmEl.textContent = wpm;
    }

    inputEl.addEventListener("input", () => {
      let input = inputEl.value.split("");
      charactersTyped++;
      let quoteChars = quoteEl.querySelectorAll("span");
      errors = 0;

      quoteChars.forEach((charSpan, index) => {
        let typedChar = input[index];
        if (typedChar == null) {
          charSpan.classList.remove("correct", "incorrect");
        } else if (typedChar === charSpan.innerText) {
          charSpan.classList.add("correct");
          charSpan.classList.remove("incorrect");
        } else {
          charSpan.classList.add("incorrect");
          charSpan.classList.remove("correct");
          errors++;
        }
      });

      let correctChars = charactersTyped - errors;
      let accuracy = Math.round((correctChars / charactersTyped) * 100);
      accuracyEl.textContent = accuracy;
      errorsEl.textContent = errors;
    });

    startBtn.addEventListener("click", startTest);