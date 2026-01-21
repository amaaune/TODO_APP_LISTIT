// 🔍 1. Vérifier que l'API est accessible
async function checkApiHealth() {
  try {
    const response = await fetch('/api/health');
    const data = await response.json();
    
    if (data.status === 'ok') {
      document.getElementById('api-status').textContent = '✅ API connectée';
      document.getElementById('api-status').style.color = 'green';
    }
  } catch (error) {
    document.getElementById('api-status').textContent = '❌ API indisponible';
    document.getElementById('api-status').style.color = 'red';
  }
}

// 📝 2. Afficher le statut de connexion
function displayConnectionStatus(isConnected) {
  const statusEl = document.getElementById('api-status');
  if (isConnected) {
    statusEl.textContent = '✅ Connecté';
    statusEl.style.color = 'green';
  } else {
    statusEl.textContent = '❌ Déconnecté';
    statusEl.style.color = 'red';
  }
}

// ➕ 3. Ajouter une tâche en local (pas de BD)
let tasks = []; // Stockage en mémoire

function addTask() {
  const input = document.getElementById('todo-input');
  const taskText = input.value.trim();
  
  if (taskText === '') return;
  
  const task = {
    id: Date.now(),
    text: taskText,
    completed: false
  };
  
  tasks.push(task);
  input.value = '';
  renderTasks();
}

// 🎨 4. Afficher les tâches à l'écran
function renderTasks() {
  const tasksList = document.getElementById('tasks');
  tasksList.innerHTML = '';
  
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
      <span>${task.text}</span>
      <button class="delete-btn" onclick="deleteTask(${task.id})">Supprimer</button>
    `;
    tasksList.appendChild(li);
  });
}

// 🗑️ 5. Supprimer une tâche
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

// 🎯 6. Event listeners
document.getElementById('add-btn').addEventListener('click', addTask);
document.getElementById('todo-input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

// ✅ Vérifier l'API au chargement
window.addEventListener('load', checkApiHealth);
