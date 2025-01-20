<template>
    <div class="filter-buttons">
      <button @click="$emit('filter-changed', 'all')">All Tasks</button>
      <button @click="$emit('filter-changed', 'completed')">Completed</button>
      <button @click="$emit('filter-changed', 'uncompleted')">Uncompleted</button>
      <button @click="$emit('filter-changed', 'date')">Sort by Date</button>
    </div>
  </template>
  
  <style scoped>
  /* Add styles here */
  button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  margin-left: 10px;
}

button:last-child {
  background-color: #e74c3c;
  /* Red color for delete button */
}

.filter-buttons {
  margin: 16px 0;
}

.filter-buttons button {
  margin-right: 10px;
  padding: 8px 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.filter-buttons button:hover {
  background-color: #2980b9;
}
  </style>
  