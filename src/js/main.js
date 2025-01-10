document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('.todo-input');
  const addBtn = document.querySelector('#add-btn');
  const container = document.querySelector('#list');

  let todoArray = [
    {
      key: '',
      title: 'ПРОСЫПАТСА',
      status: 'no',
    },
    {
      key: '',
      title: 'АНЖУМАНИЯ',
      status: 'no',
    },
    {
      key: '',
      title: 'ПРЕСС КАЧАТ',
      status: 'no',
    },
  ];

  function renderTodo(array, container) {
    if (document.querySelector('.todo-item-wrapper')) {
      document
        .querySelectorAll('.todo-item-wrapper')
        .forEach((el) => el.remove());
      // .forEach((el) => (el.style.display = 'none'));
    }

    array.forEach(({ key, title, status }, index) => {
      const li = document.createElement('li');
      li.classList.add('w-full', 'todo-item-wrapper');

      li.innerHTML = `
        <div data-status="${status}" data-key="${index}"
          class="todo-item todo-item--${index + 1} ${status} flex min-h-[52px] w-full items-center justify-between gap-4 rounded-md bg-white px-2 py-2 pl-4"
        >
          <h3 class="text-2xl font-semibold">${title}</h3>
          <div class="flex h-full gap-1 text-xl text-white">
            <button
              class="btn-success flex h-full min-w-[52px] flex-shrink-0 items-center justify-center rounded-md bg-green px-2 py-1"
            >
              Success
            </button>
            <button
              class="btn-delete flex h-full min-w-[52px] flex-shrink-0 items-center justify-center rounded-md bg-red px-2 py-1"
            >
              Delete
            </button>
          </div>
        </div>
      `;
      container.append(li);
      // Меняем все значения key в массиве на соответствующий index объекта
      todoArray.forEach((q, index) => {
        Object.defineProperty(q, 'key', {
          value: String(index),
        });
      });
    });
  }
  renderTodo(todoArray, container);

  function createTodo(el) {
    if (el.value === '') {
      el.classList.add('error');
    } else {
      let createTitle = el.value;

      let createObject = {
        key: String(todoArray.length),
        title: createTitle,
        status: 'no',
      };

      const li = document.createElement('li');
      li.classList.add('w-full', 'todo-item-wrapper');

      li.innerHTML = `
        <div data-status="no" data-key="${todoArray.length}"
          class="todo-item todo-item--${todoArray.length + 1} flex min-h-[52px] w-full items-center justify-between gap-4 rounded-md bg-white px-2 py-2 pl-4"
        >
          <h3 class="text-2xl font-semibold">${createTitle}</h3>
          <div class="flex h-full gap-1 text-xl text-white">
            <button
              class="btn-success flex h-full min-w-[52px] flex-shrink-0 items-center justify-center rounded-md bg-green px-2 py-1"
            >
              Success
            </button>
            <button
              class="btn-delete flex h-full min-w-[52px] flex-shrink-0 items-center justify-center rounded-md bg-red px-2 py-1"
            >
              Delete
            </button>
          </div>
        </div>
      `;
      container.append(li);
      el.value = '';

      todoArray.push(createObject);

      console.log(todoArray);
    }
  }

  addBtn.addEventListener('click', () => {
    createTodo(input);
  });
  input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      createTodo(input);
    }
  });

  function completeTodo(e) {
    if (e.target.classList.contains('btn-success')) {
      let item = e.target
        .closest('.todo-item-wrapper')
        .querySelector('.todo-item');
      // Замена статуса с NO на DONE
      item.setAttribute('data-status', 'done');
      // Узнаем ключ
      let itemKey = item.dataset.key;
      // Находим в массиве по ключу и меняем status на DONE
      Object.defineProperty(todoArray[itemKey], 'status', {
        value: 'done',
      });
      // Меняем задний фон на зеленый
      item.style.backgroundColor = '#77CA89';

      console.log(todoArray);
    }
  }
  function deleteTodo(e) {
    if (e.target.classList.contains('btn-delete')) {
      let itemWrapper = e.target.closest('.todo-item-wrapper');
      let item = e.target
        .closest('.todo-item-wrapper')
        .querySelector('.todo-item');
      // Узнаем ключ
      let itemKey = item.dataset.key;
      //  Удалаем todo
      itemWrapper.remove();
      // itemWrapper.style.display = 'none';
      // Находим по ключу в массиве и удаляем
      todoArray = todoArray.filter((item) => item.key !== itemKey);

      renderTodo(todoArray, container);

      console.log(todoArray);
    }
  }
  document.addEventListener('click', function (e) {
    completeTodo(e);
    deleteTodo(e);
  });

  // При изменении массива сохранять или перезаписывать в LocalStorage
  // Сортировка по выполненным, сначала первым выполненные а при втором сперва не выполненные
});
