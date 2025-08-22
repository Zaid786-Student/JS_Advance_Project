(function(){
  const KEY = 'portfolioCMS:v1';
  const form = document.getElementById('projectForm');
  const saveBtn = document.getElementById('saveBtn');
  const resetBtn = document.getElementById('resetBtn');
  const grid = document.getElementById('grid');
  const search = document.getElementById('search');
  const sort = document.getElementById('sort');
  const tpl = document.getElementById('cardTpl');

  let items = JSON.parse(localStorage.getItem(KEY) || '[]');

  function uid(){ return Date.now().toString(36)+Math.random().toString(36).slice(2,6); }
  function saveAll(){ localStorage.setItem(KEY, JSON.stringify(items)); }

  function formDataToObj(form){
    const fd = new FormData(form);
    const obj = {};
    for(const [k,v] of fd.entries()) obj[k]=v.trim();
    if(!obj.id) obj.id = uid();
    obj.createdAt = obj.createdAt || Date.now();
    return obj;
  }

  function setForm(item={}){
    form.elements.id.value = item.id || '';
    form.elements.title.value = item.title || '';
    form.elements.tag.value = item.tag || '';
    form.elements.desc.value = item.desc || '';
    form.elements.img.value = item.img || '';
  }

  function render(){
    const q = search.value.trim().toLowerCase();
    let list = items.filter(i=> i.title.toLowerCase().includes(q) || i.tag.toLowerCase().includes(q));
    if(sort.value === 'title'){
      list.sort((a,b)=> a.title.localeCompare(b.title));
    } else {
      list.sort((a,b)=> b.createdAt - a.createdAt);
    }
    grid.innerHTML = '';
    list.forEach(i=> grid.appendChild(card(i)));
  }

  function card(item){
    const node = tpl.content.cloneNode(true);
    node.querySelector('.thumb').src = item.img || 'https://picsum.photos/600/400?blur=2';
    node.querySelector('.thumb').alt = item.title || 'Project image';
    node.querySelector('.title').textContent = item.title || 'Untitled';
    node.querySelector('.tag').textContent = item.tag || '';
    node.querySelector('.desc').textContent = item.desc || '';
    const el = node.querySelector('.project');
    el.dataset.id = item.id;
    el.addEventListener('click', (e)=>{
      const act = e.target.dataset.action;
      if(act==='edit'){
        setForm(item);
        window.scrollTo({top:0,behavior:'smooth'});
      } else if(act==='delete'){
        if(confirm('Delete this project?')){
          items = items.filter(x => x.id !== item.id);
          saveAll(); render();
        }
      }
    });
    return node;
  }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const obj = formDataToObj(form);
    const idx = items.findIndex(i=> i.id === obj.id);
    if(idx>-1){ items[idx] = {...items[idx], ...obj}; } else { items.push(obj); }
    saveAll();
    setForm({}); // reset
    render();
  });

  resetBtn.addEventListener('click', ()=> setForm({}));
  search.addEventListener('input', render);
  sort.addEventListener('change', render);

  // Seed a couple examples on first use
  if(items.length === 0){
    items = [
      {id:uid(), title:'Weather App', tag:'API', desc:'5-day forecast with charts', img:'https://picsum.photos/seed/p1/600/400', createdAt: Date.now()-10000},
      {id:uid(), title:'Notes App', tag:'CRUD', desc:'Searchable notes with LocalStorage', img:'https://picsum.photos/seed/p2/600/400', createdAt: Date.now()-5000}
    ];
    saveAll();
  }

  render();
})();