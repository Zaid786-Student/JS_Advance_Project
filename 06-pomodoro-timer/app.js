(function(){
  const display = document.getElementById('display');
  const startPauseBtn = document.getElementById('startPauseBtn');
  const resetBtn = document.getElementById('resetBtn');
  const skipBtn = document.getElementById('skipBtn');
  const progress = document.getElementById('progress');
  const workInput = document.getElementById('workInput');
  const shortInput = document.getElementById('shortInput');
  const longInput = document.getElementById('longInput');
  const autoNext = document.getElementById('autoNext');
  const cyclesEl = document.getElementById('cycles');
  const modeButtons = [...document.querySelectorAll('.mode-btn')];

  const modes = {
    work: () => +workInput.value * 60,
    short: () => +shortInput.value * 60,
    long: () => +longInput.value * 60,
  };

  let mode = 'work';
  let total = modes[mode]();
  let remaining = total;
  let timer = null;
  let cycles = 0;

  function setMode(newMode){
    mode = newMode;
    total = modes[mode]();
    remaining = total;
    updateDisplay();
    updateActiveButton();
    updateProgress();
  }

  function updateActiveButton(){
    modeButtons.forEach(b=>b.classList.toggle('active', b.dataset.mode===mode));
  }

  function tick(){
    remaining--;
    if(remaining <= 0){
      clearInterval(timer);
      timer = null;
      remaining = 0;
      updateDisplay();
      updateProgress();
      if(mode === 'work'){ cycles++; cyclesEl.textContent = cycles; }
      // Auto move to next phase
      const next = (mode === 'work') ? 'short' : (mode === 'short' ? 'work' : 'work');
      if(autoNext.checked){ setMode(next); start(); }
      startPauseBtn.textContent = 'Start';
      return;
    }
    updateDisplay();
    updateProgress();
  }

  function updateDisplay(){
    const m = Math.floor(remaining/60).toString().padStart(2,'0');
    const s = Math.floor(remaining%60).toString().padStart(2,'0');
    display.textContent = `${m}:${s}`;
  }

  function updateProgress(){
    progress.max = total;
    progress.value = total - remaining;
  }

  function start(){
    if(timer) return;
    startPauseBtn.textContent = 'Pause';
    timer = setInterval(tick, 1000);
  }

  function pause(){
    clearInterval(timer);
    timer = null;
    startPauseBtn.textContent = 'Start';
  }

  startPauseBtn.addEventListener('click', ()=>{
    if(timer) pause(); else start();
  });
  resetBtn.addEventListener('click', ()=>{
    pause();
    remaining = modes[mode]();
    updateDisplay();
    updateProgress();
  });
  skipBtn.addEventListener('click', ()=>{
    pause();
    const next = (mode === 'work') ? 'short' : (mode === 'short' ? 'work' : 'work');
    setMode(next);
  });
  modeButtons.forEach(btn=>btn.addEventListener('click', ()=>{
    pause();
    setMode(btn.dataset.mode);
  }));
  [workInput, shortInput, longInput].forEach(inp => inp.addEventListener('change', ()=>{
    if(!timer){ total = modes[mode](); remaining = total; updateDisplay(); updateProgress(); }
  }));

  setMode('work');
})();