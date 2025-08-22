(function(){
  const QUESTIONS = [
    {q:'Which method selects an element by CSS selector?', a:['getElementById','querySelector','getElementsByClassName','querySelectorAll'], c:1},
    {q:'Which Array method creates a new array with elements that pass a test?', a:['map','reduce','filter','forEach'], c:2},
    {q:'What does DOM stand for?', a:['Document Object Model','Data Object Method','Digital Ordinance Model','Document Oriented Module'], c:0},
    {q:'Which keyword declares a constant in JS?', a:['let','var','const','static'], c:2},
    {q:'Which operator spreads iterable elements?', a:['...','??','||','=>'], c:0},
    {q:'JSON.parse converts JSON string to?', a:['Number','Array','Object','Function'], c:2},
    {q:'Which loop runs at least once?', a:['for','while','do...while','for...of'], c:2},
    {q:'How to prevent default form submit?', a:['stopPropagation','preventDefault','return false','stopImmediatePropagation'], c:1},
    {q:'Which Promise state is final?', a:['pending','settled','queued','suspended'], c:1},
    {q:'LocalStorage stores values as?', a:['Objects','Strings','Numbers','Any'], c:1},
  ];

  const startCard = document.getElementById('startCard');
  const quizCard = document.getElementById('quizCard');
  const resultCard = document.getElementById('resultCard');
  const numQuestions = document.getElementById('numQuestions');
  const totalTime = document.getElementById('totalTime');
  const startBtn = document.getElementById('startBtn');
  const qIndexEl = document.getElementById('qIndex');
  const qTotalEl = document.getElementById('qTotal');
  const timeEl = document.getElementById('time');
  const progress = document.getElementById('progress');
  const questionEl = document.getElementById('question');
  const answersEl = document.getElementById('answers');
  const nextBtn = document.getElementById('nextBtn');
  const scoreText = document.getElementById('scoreText');
  const restartBtn = document.getElementById('restartBtn');

  let picked = [];
  let current = 0;
  let timerId = null;
  let secondsLeft = 0;
  let score = 0;
  let chosenIndex = null;

  function shuffle(arr){ return arr.map(v=>[Math.random(),v]).sort((a,b)=>a[0]-b[0]).map(v=>v[1]); }

  function startQuiz(){
    const n = Math.min(+numQuestions.value, QUESTIONS.length);
    picked = shuffle([...QUESTIONS]).slice(0,n);
    current = 0;
    score = 0;
    chosenIndex = null;
    secondsLeft = Math.max(10, +totalTime.value || 60);
    progress.max = n;
    progress.value = 0;
    qTotalEl.textContent = n;
    startCard.classList.add('hidden');
    resultCard.classList.add('hidden');
    quizCard.classList.remove('hidden');
    startTimer();
    renderQ();
  }

  function startTimer(){
    clearInterval(timerId);
    timeEl.textContent = secondsLeft;
    timerId = setInterval(()=>{
      secondsLeft--;
      timeEl.textContent = secondsLeft;
      if(secondsLeft <= 0){
        clearInterval(timerId);
        endQuiz();
      }
    }, 1000);
  }

  function renderQ(){
    const item = picked[current];
    qIndexEl.textContent = current + 1;
    questionEl.textContent = item.q;
    answersEl.innerHTML = '';
    nextBtn.disabled = true;
    chosenIndex = null;

    item.a.forEach((opt, i)=>{
      const btn = document.createElement('button');
      btn.className = 'answer';
      btn.textContent = opt;
      btn.addEventListener('click', ()=>{
        if(chosenIndex != null) return;
        chosenIndex = i;
        if(i === item.c){
          btn.classList.add('correct');
          score++;
        } else {
          btn.classList.add('wrong');
          // mark correct one
          [...answersEl.children][item.c].classList.add('correct');
        }
        nextBtn.disabled = false;
      });
      answersEl.appendChild(btn);
    });
  }

  nextBtn.addEventListener('click', ()=>{
    if(current < picked.length - 1){
      current++;
      progress.value = current;
      renderQ();
    } else {
      endQuiz();
    }
  });

  function endQuiz(){
    clearInterval(timerId);
    quizCard.classList.add('hidden');
    resultCard.classList.remove('hidden');
    scoreText.textContent = `${score} / ${picked.length}`;
  }

  restartBtn.addEventListener('click', ()=>{
    startCard.classList.remove('hidden');
    resultCard.classList.add('hidden');
  });

  startBtn.addEventListener('click', startQuiz);
})();