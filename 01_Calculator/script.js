
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button');
    let input = '';

    function updateDisplay() {
      display.textContent = input || '0';
    }

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const value = btn.textContent;

        if (btn.classList.contains('clear')) {
          input = '';
        } 
        else if (btn.classList.contains('equal')) {
          try {
            input = input.replace(/×/g, '*').replace(/÷/g, '/');
            input = eval(input).toString();
          } catch {
            input = 'Error';
          }
        } 
        else if (btn.classList.contains('percent')) {
          input += '/100';
        }
        else {
          input += value;
        }
        updateDisplay();
      });
    });

    // ✅ Keyboard Support
    document.addEventListener('keydown', (e) => {
      if((e.key >= 0 && e.key <= 9) || ['+', '-', '*', '/', '.', '(', ')'].includes(e.key)){
        input += e.key;
      } 
      else if(e.key === 'Enter'){
        try {
          input = eval(input).toString();
        } catch {
          input = 'Error';
        }
      } 
      else if(e.key === 'Backspace'){
        input = input.slice(0, -1);
      } 
      else if(e.key.toLowerCase() === 'c'){
        input = '';
      }
      updateDisplay();
    });

  //    const display = document.querySelector('.display');
  // const buttons = document.querySelectorAll('.buttons button');
  // const clearButton = document.getElementById('clear');

  // buttons.forEach(button => {
  //   button.addEventListener('click', () => {
  //       if (button.textContent === '=') {
  //           try {
  //               display.value = eval(display.value)
  //           } catch {
  //               display.value = 'Error'
  //           }
  //       } else {
  //       display.value += button.textContent;
  //       }
  //   });
  // });

  // clearButton.addEventListener('click', () => {
  //   display.value = '';
  // });