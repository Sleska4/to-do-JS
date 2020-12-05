const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];


(function(arrOfTasks) {
  const tasks = arrOfTasks.reduce((a, b) => {
    a[b._id] = b;
    return a;
  }, {})

  const listGroup = document.querySelector('.list-group');

  const form = document.forms['addTask'];
  const inputTitle = form.elements['title'];
  const inputBody = form.elements['body'];
  const delList = document.querySelector('.del-list');

  const theme = {
    light: {
      '--background': 'white',
      '--navbar': 'blue',
      '--textColor': 'black',
      '--hColor': 'white',
      '--liColor': 'white',
    },
    dark:{
      '--background': 'black',
      '--navbar': 'black',
      '--textColor': 'white',
      '--hColor': 'white',
      '--liColor': 'rgba(54,59,59,0.8)'
    }
  }
  const themeSelect = document.querySelector('#theme');

  let liDel = []


  render(tasks);


  function render(){
    const fragment = document.createDocumentFragment();
    Object.values(tasks).forEach(el => {
      fragment.appendChild(renderLi(el));
    })
    listGroup.appendChild(fragment)
  }

  form.addEventListener('submit', onSubmit);


  // Генерирует лишку
  function renderLi({_id, title, body} = {}){

    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2');

    const span = document.createElement('span');
    span.textContent = title;
    span.style.fontWeight = 'bold';

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');
    delBtn.addEventListener('click', function (){
      delBtn.parentElement.remove();
      delete tasks[_id];
    })

    const article = document.createElement('p');
    article.textContent = body;
    article.classList.add('mt-2', 'w-100');

    [span, article, delBtn].forEach(el =>{
      li.appendChild(el);
    })


    // Выделяет лишку в крсный цвет при клиеке и заносит id в массив
    li.addEventListener('click', function (){
      const toggle = li.classList.toggle('is-active');
      if(liDel.indexOf(_id) === -1 && toggle){
        liDel.push(_id)
      } else {
        delete liDel[liDel.indexOf(_id)];
      }
      console.log(liDel)
    }, true)

    return(li)
  }


  // Функция для добавления новых элементов в список
  function onSubmit(e){
    e.preventDefault();
    const titleValue = inputTitle.value;
    const titleBody = inputBody.value;
    if(!titleBody || !titleValue){
      console.error('Введите текст!');
      alert('Вы не ввели текст!');
      return;
    }

    newTask(titleValue, titleBody)


    function newTask(title, body) {
      const elem = {
        title,
        body,
        _id: `test ${Math.random()}`,
        completed: false
      }
      tasks[elem._id] = elem;
      listGroup.insertAdjacentElement('afterbegin' ,renderLi(elem));
    }
    form.reset()
  }


  // Подтверждение удаления
  delList.addEventListener('click', function (){
    if(confirm('Вы действительно хотите удалить выбранные элементы?')) {
      const liForDel = document.querySelectorAll('.is-active');
      liForDel.forEach(el => {
        el.remove();
        liDel = []
      })
    } else{
      const liEnd = document.querySelectorAll('.list-group li');
      liEnd.forEach(el => {
        el.classList.remove('is-active')
      })
    }
  })


  // Отслеживает изменение темы
  themeSelect.addEventListener('change', themeChangeName)
  function themeChangeName(){
    setTheme(themeSelect.value);
  }


  function setTheme(name){
    const themeChange = theme[name];
    Object.entries(themeChange).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    })
  }

})(tasks);