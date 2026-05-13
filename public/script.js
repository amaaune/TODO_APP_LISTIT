// Verifie si l'API repond et affiche le statut
async function checkApiHealth() {
  const el = document.getElementById('api-status');
  try {
    const res = await fetch('/api/health');
    const data = await res.json();
    el.textContent = data.status === 'ok' ? 'API connectee' : 'API erreur';
  } catch {
    el.textContent = 'API indisponible';
  }
}

// Recupere tous les todos depuis la BD et les affiche
async function loadTodos() {
  try {
    const res = await fetch('/api/todos');
    const { data } = await res.json();
    renderTasks(data);
  } catch {
    console.error('Impossible de charger les taches');
  }
}

// Affiche la liste des todos dans le DOM
// Affiche la liste des todos dans le DOM
function renderTasks(todos) {
  const list = document.getElementById('tasks');
  list.innerHTML = '';

  const active = todos.filter(t => !t.completed);
  const done = todos.filter(t => t.completed);

  if (active.length > 0) {
    list.innerHTML += `<li class="section-title">📋 À faire (${active.length})</li>`;
    active.forEach(todo => list.appendChild(createTaskItem(todo)));
  }

  if (done.length > 0) {
    list.innerHTML += `<li class="section-title done-title">✅ Réalisées (${done.length})</li>`;
    done.forEach(todo => list.appendChild(createTaskItem(todo)));
  }
}

function createTaskItem(todo) {
  const li = document.createElement('li');
  li.className = 'task-item' + (todo.completed ? ' completed' : '');
  li.innerHTML = `
    <span onclick="toggleTodo(${todo.id}, ${todo.completed})">
      ${todo.completed ? '☑' : '☐'} ${todo.title}
    </span>
    <button class="delete-btn" onclick="deleteTodo(${todo.id})">Supprimer</button>
  `;
  return li;
}

// Envoie un nouveau todo a l'API
async function addTask() {
  const input = document.getElementById('todo-input');
  const title = input.value.trim();
  if (!title) return;

  try {
    await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    input.value = '';
    loadTodos(); // recharge la liste depuis la BD
  } catch {
    console.error('Impossible d\'ajouter la tache');
  }
}

// Inverse le statut completed d'un todo
async function toggleTodo(id, currentCompleted) {
  try {
    await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !currentCompleted }),
    });
    loadTodos();
  } catch {
    console.error('Impossible de mettre a jour la tache');
  }
}

// Supprime un todo
async function deleteTodo(id) {
  try {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    loadTodos();
  } catch {
    console.error('Impossible de supprimer la tache');
  }
}

document.getElementById('add-btn').addEventListener('click', addTask);
document.getElementById('todo-input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

// Au chargement : verifie l'API et charge les todos existants
window.addEventListener('load', () => {
  checkApiHealth();
  loadTodos();
});
