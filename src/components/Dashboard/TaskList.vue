<template>
    <ul v-if="tasks.length > 0">
      <li v-for="task in filteredAndSortedTasks" :key="task.id">
        <div>
          Title: {{ getTruncatedTitle(task.title) }}
        </div>
        <div>
          Description: {{ getTruncatedDescription(task.description) }}
        </div>
        <div>Completed: {{ task.completed }}</div>
        <div class="task-dates">
          <small>Created: {{ formatDate(task.createdAt) }}</small> |
          <small>Updated: {{ formatDate(task.updatedAt) }}</small>
        </div>
        <button @click="$emit('edit-task', task)">Edit</button>
        <button @click="$emit('delete-task', task._id)">Delete</button>
      </li>
    </ul>
    <p v-else>No tasks available.</p>
  </template>
  
  <script>
  export default {
    name: "TaskList",
    props: {
      tasks: Array,
      filteredAndSortedTasks: Array
    },
    methods: {
      getTruncatedTitle(title) {
        return title.length > 23 ? title.substring(0, 20) + '...' : title;
      },
      getTruncatedDescription(description) {
        return description.length > 60 ? description.substring(0, 57) + '...' : description;
      },
      formatDate(date) {
        return new Date(date).toLocaleDateString();
      }
    }
  };
  </script>
  
  <style scoped>
  ul {
    display: flex;
    padding: 50px;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  li {
    margin: 50px;
    border: 2px solid;
    border-color: var(--border-color);
    border-radius: 20px;
    padding: 5px 0;
  }
  
  @media (max-width: 768px) {
    ul {
      flex-direction: column;
    }
  }
  
  .task-dates {
    font-size: 0.8em;
    color: var(--text-date-color);
    margin-top: 8px;
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
  }
  </style>
  