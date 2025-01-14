document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('.todo-input');
  const addBtn = document.querySelector('#add-btn');
  const sortBtn = document.querySelector('#sort');
  const container = document.querySelector('#list');
  const localStorageKey = 'newTodos';

  function template(noteText, completed, index) {
    return `
      <li"
        class="todo-item ${completed === true ? 'bg-[#77CA89]' : 'bg-white'} flex min-h-[52px] w-full items-center justify-between gap-4 rounded-md  px-2 py-2 pl-4"
      >
        <h3 class="text-2xl font-semibold">${noteText}</h3>
        <div class="flex h-full gap-1 text-xl text-white">
          <button
            class="btn-success flex h-full min-w-[52px] flex-shrink-0 items-center justify-center rounded-md px-2 py-1 ${completed === true ? 'bg-yellow-500' : 'bg-green'}"
            data-index="${index}"
            data-type="toggle"
          >
            Success
          </button>
          <button
            class="btn-delete flex h-full min-w-[52px] flex-shrink-0 items-center justify-center rounded-md bg-red px-2 py-1"
            data-index="${index}"
            data-type="delete"
          >
            Delete
          </button>
        </div>
      </li>
    `;
  }

  function saveToStorage(array) {
    localStorage.setItem(localStorageKey, JSON.stringify(array));
  }

  function getToStorage() {
    return JSON.parse(localStorage.getItem(localStorageKey));
  }

  function first() {
    if (localStorage.getItem(localStorageKey) !== null) {
      renderNotes();
    } else {
      saveToStorage([]);
    }
  }

  first();

  function renderNotes() {
    container.innerHTML = '';
    if (getToStorage().length === 0) {
      container.innerHTML =
        '<span class="w-full text-center text-2xl text-white">Нет элементов</span>';
      sortBtn.classList.add('hidden');
    } else if (getToStorage().length > 0) {
      let notes = getToStorage();
      notes.forEach((notesEl, index) => {
        container.insertAdjacentHTML(
          'beforeend',
          template(notesEl.noteText, notesEl.completed, index),
        );
      });
      if (notes.filter((item) => item.completed).length > 0) {
        sortBtn.classList.remove('hidden');
      } else {
        sortBtn.classList.add('hidden');
      }
    }
  }

  function addNote() {
    if (input.value === '') {
      input.classList.add('error');
    } else {
      input.classList.remove('error');
      let newNote = {
        noteText: input.value,
        completed: false,
      };
      let notes = getToStorage();
      notes.push(newNote);
      saveToStorage(notes);
      input.value = '';
    }
  }

  addBtn.addEventListener('click', () => {
    addNote();
    renderNotes();
  });

  input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      addNote();
      renderNotes();
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.dataset.index) {
      let notes = getToStorage();
      let index = Number(e.target.dataset.index);
      let type = e.target.dataset.type;
      if (type === 'toggle') {
        notes[index].completed = !notes[index].completed;
        saveToStorage(notes);
        renderNotes();
      } else if (type === 'delete') {
        notes.splice(index, 1);
        saveToStorage(notes);
        renderNotes();
      }
    }
  });

  sortBtn.addEventListener('click', () => {
    let notes = getToStorage();
    if (notes[0].completed === true) {
      notes.sort(function (a, b) {
        if (a.completed > b.completed) {
          return 1;
        }
        if (a.completed < b.completed) {
          return -1;
        }
        return 0;
      });
      saveToStorage(notes);
      renderNotes();
      localStorage.setItem('sort', false);
    } else if (notes[0].completed === false) {
      notes.sort(function (a, b) {
        if (a.completed < b.completed) {
          return 1;
        }
        if (a.completed > b.completed) {
          return -1;
        }
        return 0;
      });
      saveToStorage(notes);
      renderNotes();
      localStorage.setItem('sort', true);
    }
  });
});
