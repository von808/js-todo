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

  function template(status, key, itemNumb, statusClass, title) {
    return `
      <div data-status="${status}" data-key="${key}"
        class="todo-item todo-item--${itemNumb + 1} ${statusClass} flex min-h-[52px] w-full items-center justify-between gap-4 rounded-md bg-white px-2 py-2 pl-4"
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
  }

  function saveToStorage(array) {
    localStorage.setItem('todos', JSON.stringify(array));
  }
  function getToStorage() {
    return JSON.parse(localStorage.getItem('todos'));
  }

  function changeKey(aruy) {
    aruy.forEach((q, index) => {
      Object.defineProperty(q, 'key', {
        value: String(index),
      });
    });
  }

  function renderTodo(array, container) {
    if (document.querySelector('.todo-item-wrapper')) {
      document
        .querySelectorAll('.todo-item-wrapper')
        .forEach((el) => el.remove());
    }

    function whoArrayF(whoArray) {
      whoArray.forEach(({ key, title, status }, index) => {
        const li = document.createElement('li');
        li.classList.add('w-full', 'todo-item-wrapper');

        li.innerHTML = template(status, index, index, status, title);

        container.append(li);

        // Прверяем есть ли массив в localStorage
        if (localStorage.getItem('todos') !== null) {
          let localStorageTodoArray = JSON.parse(localStorage.getItem('todos'));
          // Меняем все значения key в массиве на соответствующий index объекта
          changeKey(localStorageTodoArray);
          // Сохраняем в localStorage
          saveToStorage(localStorageTodoArray);
        } else {
          // Меняем все значения key в массиве на соответствующий index объекта
          changeKey(whoArray);
        }
      });
    }

    if (localStorage.getItem('todos') !== null) {
      let localStorageTodoArray = JSON.parse(localStorage.getItem('todos'));
      whoArrayF(localStorageTodoArray);
    } else {
      whoArrayF(array);
    }
  }
  renderTodo(todoArray, container);

  function createTodo(el) {
    if (el.value === '') {
      el.classList.add('error');
    } else {
      let createTitle = el.value;

      const li = document.createElement('li');
      li.classList.add('w-full', 'todo-item-wrapper');

      // Прверяем есть ли массив в localStorage
      if (localStorage.getItem('todos') !== null) {
        let localStorageTodoArray = getToStorage();

        let createObject = {
          key: String(localStorageTodoArray.length),
          title: createTitle,
          status: 'no',
        };
        li.innerHTML = template(
          'no',
          localStorageTodoArray.length,
          localStorageTodoArray.length,
          '',
          createTitle,
        );
        container.append(li);
        el.value = '';

        // Добавляем в localStorage массив
        localStorageTodoArray.push(createObject);
        // Сохраняем в localStorage
        saveToStorage(localStorageTodoArray);
        // Рендерим массив из localStorage
        renderTodo(todoArray, container);
        // Выводим массив из localStorage
        console.log(localStorageTodoArray);
      } else {
        let createObject = {
          key: String(todoArray.length),
          title: createTitle,
          status: 'no',
        };
        li.innerHTML = template(
          'no',
          todoArray.length,
          todoArray.length,
          '',
          createTitle,
        );
        container.append(li);
        el.value = '';

        // Добавляем в js массив
        todoArray.push(createObject);
        // Сохраняем в js массиве
        saveToStorage(todoArray);
        // Рендерим массив из js
        renderTodo(todoArray, container);
        // Выводим массив из js
        console.log(todoArray);
      }
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
      // Прверяем есть ли массив в localStorage
      if (localStorage.getItem('todos') !== null) {
        let localStorageTodoArray = getToStorage();
        // Находим в массиве по ключу и меняем status на DONE
        Object.defineProperty(localStorageTodoArray[itemKey], 'status', {
          value: 'done',
        });
        // Сохраняем в localStorage
        saveToStorage(localStorageTodoArray);
        // Выводим массив из localStorage
        console.log(localStorageTodoArray);
      } else {
        // Находим в массиве по ключу и меняем status на DONE
        Object.defineProperty(todoArray[itemKey], 'status', {
          value: 'done',
        });
        // Сохраняем в js массиве
        saveToStorage(todoArray);
      }
      // Меняем задний фон на зеленый
      item.style.backgroundColor = '#77CA89';
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
      // Прверяем есть ли массив в localStorage
      if (localStorage.getItem('todos') !== null) {
        let localStorageTodoArray = getToStorage();
        // Находим по ключу в массиве и удаляем
        localStorageTodoArray = localStorageTodoArray.filter(
          (item) => item.key !== itemKey,
        );
        // Меняем все ключи в массиве на соответствующий index
        changeKey(localStorageTodoArray);
        // Сохраняем в localStorage
        saveToStorage(localStorageTodoArray);
        // Рендерим массив из localStorage
        renderTodo(localStorageTodoArray, container);
        // Выводим массив из localStorage
        console.log(localStorageTodoArray);
      } else {
        // Находим по ключу в массиве и удаляем
        todoArray = todoArray.filter((item) => item.key !== itemKey);
        // Меняем все ключи в массиве на соответствующий index
        changeKey(localStorageTodoArray);
        // Сохраняем в js массиве
        saveToStorage(todoArray);
        // Рендерим массив из js
        renderTodo(todoArray, container);
        // Выводим массив из js
        // console.log(todoArray);
      }
    }
  }
  document.addEventListener('click', function (e) {
    completeTodo(e);
    deleteTodo(e);
  });

  // При изменении массива сохранять или перезаписывать в LocalStorage
  // Сортировка по выполненным, сначала первым выполненные а при втором сперва не выполненные
});
