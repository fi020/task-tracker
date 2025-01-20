<template>
    <ul v-if="tasks.length > 0">
      <li v-for="task in tasks" :key="task.id">
        <div>Title: {{ task.title }}</div>
        <div>Description: {{ task.description }}</div>
        <div>Completed: {{ task.completed }}</div>
        <div class="task-dates">
          <small>Created: {{ task.createdAt }}</small> |
          <small>Updated: {{ task.updatedAt }}</small>
        </div>
        <button @click="$emit('edit-task', task)">Edit</button>
        <button @click="$emit('delete-task', task.id)">Delete</button>
      </li>
    </ul>
    <p v-else>No tasks available.</p>
  </template>
  
  <script>
  export default {
    props: {
      tasks: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add styles here */
  ul {
  display: flex;
  padding: 50px;
  justify-content: center;
  flex-wrap: wrap;
  /* Allows items to wrap to the next row */

}

li {
  margin: 50px;
  /* gap: 16px; */
  border: 2px solid;
  border-color: var(--border-color);
  
  border-radius: 20px;
}

@media (max-width: 768px) {
  ul {
    flex-direction: column;
  }
}

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

ul {
  /* color: white; */
  list-style-type: none;
  padding-left: 0;
}

li {
  padding: 5px 0;
}

.task-dates {
  font-size: 0.8em;
  color: var(--text-date-color);
  margin-top: 8px;
}
  </style>
  