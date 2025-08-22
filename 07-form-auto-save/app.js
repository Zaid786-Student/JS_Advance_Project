(function(){
  const KEY = 'autoSave:profileForm';
  const form = document.getElementById('profileForm');
  const clearBtn = document.getElementById('clearBtn');
  const status = document.getElementById('status');
  let saveTimer;

  function serialize(form){
    const data = new FormData(form);
    const obj = {};
    for(const [k,v] of data.entries()){
      if(k==='skills'){
        if(!obj[k]) obj[k]=[];
        obj[k].push(v);
      }else{
        obj[k]=v;
      }
    }
    // Include unchecked checkboxes (to preserve state)
    const skillChecks=[...form.querySelectorAll('input[name="skills"]')];
    if(skillChecks.length && !obj.skills) obj.skills=[];
    return obj;
  }

  function hydrate(form, obj){
    if(!obj) return;
    for(const el of form.elements){
      if(!el.name) continue;
      if(el.type==='checkbox' && el.name==='skills'){
        el.checked = (obj.skills||[]).includes(el.value);
      }else if(el.type==='radio'){
        el.checked = obj[el.name] === el.value;
      }else{
        if(obj[el.name] != null) el.value = obj[el.name];
      }
    }
  }

  function save(){
    const data = serialize(form);
    localStorage.setItem(KEY, JSON.stringify(data));
    status.textContent = 'Saved';
    clearTimeout(saveTimer);
    saveTimer = setTimeout(()=> status.textContent='', 1000);
  }

  function debounceSave(){
    clearTimeout(saveTimer);
    saveTimer = setTimeout(save, 300);
  }

  form.addEventListener('input', debounceSave);
  form.addEventListener('change', save);

  clearBtn.addEventListener('click', ()=>{
    localStorage.removeItem(KEY);
    form.reset();
    status.textContent = 'Cleared';
    setTimeout(()=> status.textContent='', 1000);
  });

  hydrate(form, JSON.parse(localStorage.getItem(KEY)||'null'));
})();