// UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load Event listeners
loadEventListeners();

function loadEventListeners(){
  //DOM Load
  document.addEventListener('DOMContentLoaded', getTasks);
  //Add Task
  form.addEventListener('submit', addTask);
  //Remove Task
  taskList.addEventListener('click', removeTask);
  //Clear All Tasks
  clearBtn.addEventListener('click', clearTasks);
  //Filter Tasks
  filter.addEventListener('keyup', filterTasks);
}

function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    taskList.appendChild(li);
  });
}

function addTask(e){
  if(taskInput.value === ''){
    alert('You Should Add a Task');
  }

  //Create Li
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value));
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);

  taskList.appendChild(li);

  storeTaskInLocalStorage(taskInput.value);

  //Clear
  taskInput.value = '';

  e.preventDefault();
}

function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Confirm Delete?')){
      e.target.parentElement.parentElement.remove();

      //Remove from Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(e){
  // taskList.innerHTML = ''; 
  // OR
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  //Clear Storage
  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
  localStorage.clear();
}

function filterTasks(e){
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}