import axios from "axios";
import CreateTask from "../CreateTask.vue";
import EditTask from "../EditTask.vue";
import ConfirmDialog from "../ConfirmDialog.vue";

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
      filter: 'all',  // Default filter (all tasks)
    };
  },
  async created() {
    this.checkAuthentication();
  },
  computed: {
    filteredAndSortedTasks() {
      let filteredTasks = [...this.tasks];

      if (this.filter === 'completed') {
        filteredTasks = filteredTasks.filter(task => task.completed);
      } else if (this.filter === 'uncompleted') {
        filteredTasks = filteredTasks.filter(task => !task.completed);
      }

      filteredTasks.sort((a, b) => {
        if (a.completed === b.completed) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return a.completed - b.completed;
      });

      return filteredTasks;
    }
  },
  methods: {
    setFilter(filterType) {
      this.filter = filterType;
    },
    formatDate(date) {
      if (!date) return "N/A";
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(date).toLocaleDateString("en-US", options);
    },
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
    openCreateTaskForm() {
      this.showCreateTaskForm = true;
    },
    closeCreateTaskForm() {
      this.showCreateTaskForm = false;
    },
    openEditForm(task) {
      this.editTaskData = { ...task };
    },
    closeEditTaskForm() {
      this.editTaskData = null;
    },
    handleTaskCreated() {
      this.closeCreateTaskForm();
      this.fetchTasks();
    },
    handleTaskUpdated() {
      this.closeEditTaskForm();
      this.fetchTasks();
    },
    openDeleteDialog(taskId) {
      this.taskToDelete = taskId;
      this.isDialogVisible = true;
    },
    closeDeleteDialog() {
      this.isDialogVisible = false;
      this.taskToDelete = null;
    },
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
