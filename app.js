// UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load Event listeners
loadEventListeners();

function loadEventListeners(){
  //Add Task
  form.addEventListener('submit', addTask);
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

  //Clear
  taskInput.value = '';

  e.preventDefault();
}