<template>
  <div>
    <h1>Dashboard</h1>
    <h2>Your Tasks</h2>
    <!-- Create Task Button -->
    <button @click="showCreateTaskForm = true">Create New Task</button>
    <!-- Task List -->
    <ul v-if="tasks.length > 0">
      <li v-for="task in sortedTasks" :key="task.id">
      <!-- <li v-for="task in tasks" :key="task.id"> -->
        <div>
          Title: 
          {{ getTruncatedTitle(task.title) }}
        </div>
        <div>
          Description:
          {{ getTruncatedDescription(task.description) }}
        </div>
        <div>Completed: {{ task.completed }}</div>
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


<script>
import axios from "axios";
import CreateTask from "./CreateTask.vue";
import EditTask from "./EditTask.vue";
import ConfirmDialog from "./ConfirmDialog.vue";

export default {
  name: "DashboardPage",
  components: { CreateTask, EditTask, ConfirmDialog },
  data() {
    return {
      tasks: [], // Task list
      showCreateTaskForm: false, // Toggle create task modal
      editTaskData: null, // Data for the task being edited
      isDialogVisible: false, // Toggle confirmation dialog
      taskToDelete: null, // ID of the task to delete
      maxDescriptionLength: 60, // Maximum length for truncated descriptions
      maxTitleLength: 23,
    };
  },
  async created() {
    this.checkAuthentication();
  },
  computed: {
    sortedTasks() {
      // Sort tasks by createdAt in descending order
      return [...this.tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
  },
  methods: {
    // Authentication check
    async checkAuthentication() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          this.$router.push("/login");
        } else {
          await this.fetchTasks();
        }
      } catch (error) {
        console.error("Authentication error:", error.message);
        this.$router.push("/login");
      }
    },

    // Fetch all tasks
    async fetchTasks() {
      try {
        const token = localStorage.getItem("token");
        const apiUrl = process.env.VUE_APP_API_URL;

        const response = await axios.get(`${apiUrl}/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.tasks = response.data;
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    },

    // Open the Create Task modal
    openCreateTaskForm() {
      this.showCreateTaskForm = true;
    },

    // Close the Create Task modal
    closeCreateTaskForm() {
      this.showCreateTaskForm = false;
    },

    // Open the Edit Task modal
    openEditForm(task) {
      this.editTaskData = { ...task };
    },

    // Close the Edit Task modal
    closeEditTaskForm() {
      this.editTaskData = null;
    },

    // Handle task creation
    handleTaskCreated() {
      this.closeCreateTaskForm();
      this.fetchTasks();
    },

    // Handle task update
    handleTaskUpdated() {
      this.closeEditTaskForm();
      this.fetchTasks();
    },

    // Open delete confirmation dialog
    openDeleteDialog(taskId) {
      this.taskToDelete = taskId;
      this.isDialogVisible = true;
    },

    // Close delete confirmation dialog
    closeDeleteDialog() {
      this.isDialogVisible = false;
      this.taskToDelete = null;
    },

    // Confirm and delete task
    async deleteTaskConfirmed() {
      try {
        const token = localStorage.getItem("token");
        const apiUrl = process.env.VUE_APP_API_URL;

        await axios.delete(`${apiUrl}/tasks/${this.taskToDelete}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.fetchTasks();
      } catch (error) {
        console.error("Error deleting task:", error.message);
      }

      this.closeDeleteDialog();
    },

    // Truncate long descriptions
    getTruncatedDescription(description) {
      return description.length > this.maxDescriptionLength
        ? description.substring(0, this.maxDescriptionLength) + "..."
        : description;
    },
    getTruncatedTitle(title) {
      return title.length > this.maxTitleLength
        ? title.substring(0, this.maxTitleLength) + "..."
        : title;
    },
  },
};
</script>






<style scoped>
ul {
  display: flex;
  padding: 50px;
  justify-content: center;
  flex-wrap: wrap; /* Allows items to wrap to the next row */

}
li{
  margin: 50px;
  /* gap: 16px; */
}
@media (max-width: 768px) {
  ul{
    flex-direction: column;
  }
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: var(--bg-color);
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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

ul {
  /* color: white; */
  list-style-type: none;
  padding-left: 0;
}

li {
  padding: 5px 0;
}
</style>