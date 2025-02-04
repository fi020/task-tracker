<template>
    <div class="overlay" v-if="task" @click.self="closePopup">
      <div class="popup">
        <h2>{{ task.title }}</h2>
        <p><strong>Description:</strong> {{ task.description }}</p>
        <p><strong>Completed:</strong> {{ task.completed ? 'Yes' : 'No' }}</p>
        <p><strong>Created:</strong> {{ formatDate(task.createdAt) }}</p>
        <p><strong>Updated:</strong> {{ formatDate(task.updatedAt) }}</p>
        <button @click="closePopup">Close</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "DisplaySingleTaskPopup",
    props: {
      task: Object
    },
    methods: {
      formatDate(date) {
        return new Date(date).toLocaleDateString();
      },
      closePopup() {
        this.$emit('close-popup');
      }
    }
  };
  </script>
  
  <style scoped>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .popup {
    background: var(--bg-color);
    color: var(--text-color);
    padding: 20px;
    border-radius: 10px;
    max-width: 500px;
    width: 80%;
    text-align: left;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .popup h2 {
    color: var(--text-color);
  }
  
  .popup p {
    color: var(--text-date-color);
  }
  
  button {
    background-color: var(--navbar-bg-color);
    color: var(--navbar-text-color);
    border: none;
    padding: 10px;
    cursor: pointer;
    margin-top: 20px;
    border-radius: 5px;
  }
  
  button:hover {
    background-color: darken(var(--navbar-bg-color), 10%);
  }
  </style>
  