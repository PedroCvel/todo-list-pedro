let todos = [
  {
    id: 1,
    name: "Configurar um workflow básico",
    description: "Configurar um workflow simples no GitHub Actions para rodar testes",
    status: "todo"
  },
  {
    id: 2,
    name: "Fazer pull request",
    description: "Enviar alterações de um fork para o repositório original no GitHub",
    status: "todo"
  },
  {
    id: 3,
    name: "Abrir uma issue",
    description: "Criar uma issue para relatar um bug ou sugerir uma melhoria em um repositório no GitHub",
    status: "todo"
  },
  {
    id: 4,
    name: "Utilizar o comando fork",
    description: "criar um fork de um repositório existente no GitHub para contribuir com projetos de terceiros",
    status: "doing"
  },
  {
    id: 5,
    name: "Configurar GitHub",
    description: "Criar conta no GitHub e conectar com o repositório local",
    status: "done"
  },
  {
    id: 6,
    name: "Estudar comandos básicos",
    description: "Aprender os comandos git add, git commit, git status e git log",
    status: "done"
  },
  {
    id: 7,
    name: "Criar primeiro commit",
    description: "Adicionar arquivos ao staging area e fazer o primeiro commit do projeto",
    status: "done"
  },
  {
    id: 8,
    name: "Configurar repositório Git",
    description: "Inicializar um novo repositório Git e configurar as informações básicas do usuário",
    status: "done"
  }
];

let nextId = 5;

function renderTodos() {
  const todoList = document.getElementById('todo-list');
  const doingList = document.getElementById('doing-list');
  const doneList = document.getElementById('done-list');

  todoList.innerHTML = '';
  doingList.innerHTML = '';
  doneList.innerHTML = '';


  todos.forEach(todo => {
    const todoElement = createTodoElement(todo);
      
    switch(todo.status) {
      case 'todo':
        todoList.appendChild(todoElement);
        break;
      case 'doing':
        doingList.appendChild(todoElement);
        break;
      case 'done':
        doneList.appendChild(todoElement);
        break;
    }
  });
}

function createTodoElement(todo) {
  const div = document.createElement('div');
  div.className = 'todo-item';
  div.draggable = true;
  div.dataset.id = todo.id;

  const statusClass = todo.status === 'todo' ? 'status-todo' : 
                      todo.status === 'doing' ? 'status-doing' : 'status-done';

  if (todo.status === 'todo') {
    actionButton = '<button class="action-btn flag-btn" onclick="moveToNext(' + todo.id + ')" title="Iniciar tarefa">🚩</button>';
  } else if (todo.status === 'doing') {
    actionButton = '<button class="action-btn check-btn" onclick="moveToNext(' + todo.id + ')" title="Finalizar tarefa">✅</button>';
  }

  div.innerHTML = `
  <div class="status-badge ${statusClass}">${todo.status}</div>
  <button class="action-btn delete-btn" onclick="deleteTodo(${todo.id})" title="Excluir tarefa">🗑️</button>
    <div class="todo-header">
        <div class="todo-name" onclick="editField(${todo.id}, 'name')">${todo.name}</div>
        ${actionButton}
    </div>
    <div class="todo-description" onclick="editField(${todo.id}, 'description')">${todo.description}</div>
  `;

  div.addEventListener('dragstart', handleDragStart);
  div.addEventListener('dragend', handleDragEnd);

  return div;
}

function addNewTodo() {
  // const name = prompt('Nome do To-Do:');
  // if (!name) return;

  // const description = prompt('Descrição do To-Do:') || '';

  // const newTodo = {
  //   id: nextId++,
  //   name: name.trim(),
  //   description: description.trim(),
  //   status: 'todo'
  // };

  // todos.push(newTodo);
  // renderTodos();
}

function deleteTodo(id) {
  // if (confirm('Tem certeza que deseja excluir este To-Do?')) {
  //   todos = todos.filter(t => t.id !== id);
  //   renderTodos();
  // }
}

function moveToNext(id) {
  const todo = todos.find(t => t.id === id);
  if (!todo) return;

  if (todo.status === 'todo') {
    todo.status = 'doing';
  } else if (todo.status === 'doing') {
    todo.status = 'done';
  }
  renderTodos();
}

function editField(id, field) {
  const todo = todos.find(t => t.id === id);
  if (!todo) return;

  const currentValue = todo[field];
  const newValue = prompt(`Editar ${field === 'name' ? 'nome' : 'descrição'}:`, currentValue);

  if (newValue !== null && newValue.trim() !== '') {
    todo[field] = newValue.trim();
    renderTodos();
  }
}

let draggedElement = null;

function handleDragStart(e) {
  draggedElement = this;
  this.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.outerHTML);
}

function handleDragEnd(e) {
  this.classList.remove('dragging');
  draggedElement = null;
}

function setupDropZones() {
  const columns = document.querySelectorAll('.column');

  columns.forEach(column => {
    column.addEventListener('dragover', handleDragOver);
    column.addEventListener('drop', handleDrop);
    column.addEventListener('dragenter', handleDragEnter);
    column.addEventListener('dragleave', handleDragLeave);
  });
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}

function handleDragEnter(e) {
  e.preventDefault();
  this.classList.add('drag-over');
}

function handleDragLeave(e) {
  if (!this.contains(e.relatedTarget)) {
    this.classList.remove('drag-over');
  }
}

function handleDrop(e) {
  e.preventDefault();
  this.classList.remove('drag-over');

  if (!draggedElement) return;

  const todoId = parseInt(draggedElement.dataset.id);
  const newStatus = this.dataset.status;

  const todo = todos.find(t => t.id === todoId);
  if (todo && todo.status !== newStatus) {
    todo.status = newStatus;
    renderTodos();
  }
}

function init() {
  setupDropZones();
  renderTodos();
}

document.addEventListener('DOMContentLoaded', init);