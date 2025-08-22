(function(){
  const STORAGE_KEY = 'taskboard:v1';
  const form = document.getElementById('newTaskForm');
  const input = document.getElementById('taskInput');
  const cols = {
    todo: document.getElementById('todo'),
    doing: document.getElementById('doing'),
    done: document.getElementById('done')
  };

  let data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"todo":[],"doing":[],"done":[]}');
  let dragItem = null;

  function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }

  function createCard(item){
    const el = document.createElement('div');
    el.className = 'card';
    el.draggable = true;
    el.dataset.id = item.id;
    el.innerHTML = `<span class="title">${item.title}</span>
      <div class="actions">
        <button class="pill" data-action="edit" title="Edit">Edit</button>
        <button class="pill" data-action="delete" title="Delete">Del</button>
      </div>`;

    el.addEventListener('dragstart', ()=>{
      dragItem = item;
      el.classList.add('dragging');
    });
    el.addEventListener('dragend', ()=>{
      el.classList.remove('dragging');
      dragItem = null;
    });

    el.addEventListener('click', (e)=>{
      const action = e.target.dataset.action;
      if(action==='delete'){
        removeItem(item);
      } else if(action==='edit'){
        const title = prompt('Edit task', item.title);
        if(title!=null && title.trim()){
          item.title = title.trim();
          render();
        }
      }
    });

    return el;
  }

  function removeItem(item){
    for(const col of ['todo','doing','done']){
      const idx = data[col].findIndex(i=>i.id===item.id);
      if(idx>-1){ data[col].splice(idx,1); break; }
    }
    render();
  }

  function render(){
    for(const col of ['todo','doing','done']){
      cols[col].innerHTML = '';
      data[col].forEach(item=> cols[col].appendChild(createCard(item)));
    }
    save();
  }

  function setupDnD(dropzone, colName){
    dropzone.addEventListener('dragover', (e)=>{
      e.preventDefault();
      dropzone.classList.add('highlight');
    });
    dropzone.addEventListener('dragleave', ()=> dropzone.classList.remove('highlight'));
    dropzone.addEventListener('drop', (e)=>{
      e.preventDefault();
      dropzone.classList.remove('highlight');
      if(!dragItem) return;
      // Remove from previous
      for(const c of ['todo','doing','done']){
        const idx = data[c].findIndex(i=>i.id===dragItem.id);
        if(idx>-1) data[c].splice(idx,1);
      }
      // Add to target
      data[colName].push(dragItem);
      render();
    });
  }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const title = input.value.trim();
    if(!title) return;
    const item = { id: Date.now().toString(36), title };
    data.todo.push(item);
    input.value='';
    render();
  });

  setupDnD(cols.todo, 'todo');
  setupDnD(cols.doing, 'doing');
  setupDnD(cols.done, 'done');

  render();
})();