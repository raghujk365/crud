// Get the form elements
const createForm = document.getElementById('create-form');
const updateForm = document.getElementById('update-form');
const deleteForm = document.getElementById('delete-form');

// Get the read container
const readContainer = document.getElementById('items-list');

// Initialize the storage key
const storageKey = 'crud-items';

// Initialize the items array
let items = [];

// Load the items from local storage
function loadItems() {
  const itemsString = localStorage.getItem(storageKey);
  if (itemsString) {
    items = JSON.parse(itemsString);
  }
}

// Save the items to local storage
function saveItems() {
  localStorage.setItem(storageKey, JSON.stringify(items));
}

// Create a new item
function createItem(name, age) {
  const id = items.length ? items[items.length - 1].id + 1 : 1;
  items.push({ id, name, age });
  saveItems();
}

// Read all items
function readItems() {
  readContainer.innerHTML = '';
  for (const item of items) {
    const li = document.createElement('li');
    li.innerText = `ID: ${item.id}, Name: ${item.name}, Age: ${item.age}`;
    readContainer.appendChild(li);
  }
}

// Update an item
function updateItem(id, name, age) {
  const itemIndex = items.findIndex((i) => i.id === id);
  if (itemIndex !== -1) {
    items[itemIndex].name = name;
    items[itemIndex].age = age;
    saveItems();
  }
}

// Delete an item
function deleteItem(id) {
  const itemIndex = items.findIndex((i) => i.id === id);
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    saveItems();
  }
}

// Load the items from local storage
loadItems();

// Bind the create form submit event
createForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('name-input').value.trim();
  const age = document.getElementById('age-input').value.trim();
  if (name && age) {
    createItem(name, age);
    readItems();
    createForm.reset();
  }
});

// Bind the update form submit event
updateForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const id = parseInt(document.getElementById('update-id-input').value);
  const name = document.getElementById('update-name-input').value.trim();
  const age = document.getElementById('update-age-input').value.trim();
  if (id && name && age) {
    updateItem(id, name, age);
    readItems();
    updateForm.reset();
  }
});

// Bind the delete form submit event
deleteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const id = parseInt(document.getElementById('delete-id-input').value);
  if (id) {
    deleteItem(id);
    readItems();
    deleteForm.reset();
  }
});

// Initial read of the items
readItems();
