<template>
    <div>
      <h1>Dashboard</h1>
      <h2>Your Tasks</h2>
      <!-- Create Task Button -->
      <button @click="showCreateTaskForm = true">Create New Task</button>
      <!-- Filter Buttons -->
      <div class="filter-buttons">
        <button @click="setFilter('all')">All Tasks</button>
        <button @click="setFilter('completed')">Completed</button>
        <button @click="setFilter('uncompleted')">Uncompleted</button>
        <button @click="setFilter('date')">Sort by Date</button>
      </div>
      <!-- Task List -->
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
          <button @click="openEditForm(task)">Edit</button>
          <button @click="openDeleteDialog(task._id)">Delete</button>
        </li>
      </ul>
      <p v-else>No tasks available.</p>
  
      <!-- Create Task Modal -->
      <div v-if="showCreateTaskForm" class="modal" @click.self="closeCreateTaskForm">
        <div class="modal-content">
          <create-task @task-created="handleTaskCreated" @cancel="closeCreateTaskForm" />
        </div>
      </div>
  
      <!-- Edit Task Modal -->
      <div v-if="editTaskData" class="modal" @click.self="closeEditTaskForm">
        <div class="modal-content">
          <edit-task :task="editTaskData" @task-updated="handleTaskUpdated" @cancel-edit="closeEditTaskForm" />
        </div>
      </div>
  
      <!-- Confirmation Dialog -->
      <confirm-dialog :isVisible="isDialogVisible" @confirm="deleteTaskConfirmed" @cancel="closeDeleteDialog" />
    </div>
  </template>
  