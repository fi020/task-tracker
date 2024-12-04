<!-- <template>
    <div>
      <h3>Edit Task</h3>
      <form @submit.prevent="updateTask">
        <div>
          <label for="title">Title:</label>
          <input v-model="updatedTask.title" type="text" id="title" required />
        </div>
        <div>
          <label for="description">Description:</label>
          <input v-model="updatedTask.description" type="text" id="description" required />
        </div>
        <div>
          <label for="completed">Completed:</label>
          <input v-model="updatedTask.completed" type="checkbox" id="completed" />
        </div>
        <button type="submit">Save Changes</button>
        <button type="button" @click="$emit('cancel-edit')">Cancel</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "EditTask",
    props: {
      task: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        updatedTask: { ...this.task }, // Clone the task to edit
      };
    },
    methods: {
      async updateTask() {
        const confirmedUpdate = window.confirm("Are you sure you want to update this task?");

        if (confirmedUpdate) {
          try {
            const token = localStorage.getItem("token");
  
            const apiUrl = process.env.VUE_APP_API_URL;
  
            const response = await axios.patch(
              `${apiUrl}/tasks/${this.updatedTask._id}`,
  
              {
                title: this.updatedTask.title,
                description: this.updatedTask.description,
                completed: this.updatedTask.completed,
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
    
            console.log(response.data);
            // alert("Task updated successfully!");
            this.$emit("task-updated"); // Notify parent to refresh tasks
          } catch (error) {
            console.error("Error updating task:", error.message);
            alert("Failed to update task. Please try again.");
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  form {
    margin-top: 20px;
  }
  
  input {
    margin-bottom: 10px;
    padding: 5px;
  }
  
  button {
    background-color: #42b983;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    margin-right: 10px;
  }
  </style>
   -->



   <template>
    <div class="editTaskForm">
      <h3>Edit Task</h3>
      <form @submit.prevent="updateTask">
        <div>
          <label for="title">Title:</label>
          <input v-model="updatedTask.title" type="text" id="title" required />
          <p>
            Words: {{ titleWordCount }}/15
            <span v-if="titleWordCount > 15" style="color: red;">
              (Exceeds limit!)
            </span>
          </p>
        </div>
        <div>
          <label for="description">Description:</label>
          <input v-model="updatedTask.description" type="text" id="description" required />
          <p>
            Words: {{ descriptionWordCount }}/50
            <span v-if="descriptionWordCount > 50" style="color: red;">
              (Exceeds limit!)
            </span>
          </p>
        </div>
        <div>
          <label for="completed">Completed:</label>
          <input v-model="updatedTask.completed" type="checkbox" id="completed" />
        </div>
        <button
          type="submit"
          :disabled="titleWordCount > 15 || descriptionWordCount > 50"
        >
          Save Changes
        </button>
        <button type="button" @click="$emit('cancel-edit')">Cancel</button>
      </form>
    </div>
  </template>

<script>
import axios from "axios";

export default {
  name: "EditTask",
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      updatedTask: { ...this.task }, // Clone the task to edit
    };
  },
  computed: {
    titleWordCount() {
      return this.updatedTask.title.trim() ? this.updatedTask.title.trim().split(/\s+/).length : 0;
    },
    descriptionWordCount() {
      return this.updatedTask.description.trim()
        ? this.updatedTask.description.trim().split(/\s+/).length
        : 0;
    },
  },
  methods: {
    validateTask() {
      if (this.titleWordCount > 15) {
        alert("The title cannot exceed 15 words.");
        return false;
      }
      if (this.descriptionWordCount > 50) {
        alert("The description cannot exceed 50 words.");
        return false;
      }
      return true;
    },
    async updateTask() {
      if (!this.validateTask()) {
        return;
      }

      const confirmedUpdate = window.confirm("Are you sure you want to update this task?");
      if (!confirmedUpdate) {
        return;
      }

      try {
        const token = localStorage.getItem("token");

        const apiUrl = process.env.VUE_APP_API_URL;

        const response = await axios.patch(
          `${apiUrl}/tasks/${this.updatedTask._id}`,
          {
            title: this.updatedTask.title,
            description: this.updatedTask.description,
            completed: this.updatedTask.completed,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log(response.data);
        this.$emit("task-updated"); // Notify parent to refresh tasks
      } catch (error) {
        console.error("Error updating task:", error.message);
        alert("Failed to update task. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
.editTaskForm{
  display: flex;
  flex-direction: column;

}
form {
  margin: auto; /* Center form horizontally */
  max-width: 400px;
  padding: 20px;
  border: 1px solid var(--text-color);
  border-radius: 8px;
  background-color: var(--bg-color);
  color: var(--text-color);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column; /* Align items vertically */
  justify-content: center;
}

div {
  display: flex;
  justify-content: center;
  align-items: center;
margin: auto;
  /* min-height: 100vh;  */
  /* Full height of the viewport */
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
  color: var(--text-color);
}

input {
  width: 100%;
  margin-bottom: 15px;
  padding: 8px;
  font-size: 14px;
  border: 1px solid var(--text-color);
  border-radius: 4px;
  background-color: var(--bg-color);
  color: var(--text-color);
  box-sizing: border-box;
}

input:focus {
  border-color: var(--navbar-bg-color);
  outline: none;
  box-shadow: 0 0 4px rgba(66, 185, 131, 0.5);
}

button {
  background-color: var(--navbar-bg-color);
  color: var(--navbar-text-color);
  border: none;
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 10px;
}

button:hover {
  background-color: rgba(66, 185, 131, 0.8);
}

button:disabled {
  background-color: var(--text-color);
  color: var(--bg-color);
  cursor: not-allowed;
}

p {
  font-size: 14px;
  color: var(--text-color);
  margin-top: -10px;
  margin-bottom: 15px;
}

p span {
  font-size: 12px;
  font-weight: bold;
  color: red;
}
</style>
