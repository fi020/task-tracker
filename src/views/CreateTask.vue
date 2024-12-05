<template>
  <div>
    <h3>Create Task</h3>
    <form @submit.prevent="createTask">
      <div>
        <label for="title">Title:</label>
        <input v-model="newTask.title" type="text" id="title" required />
        <p>
          Words: {{ titleWordCount }}/15
          <span v-if="titleWordCount > 15" style="color: red;">
            (Exceeds limit!)
          </span>
        </p>
      </div>
      <div>
        <label for="description">Description:</label>
        <input v-model="newTask.description" type="text" id="description" required />
        <p>
          Words: {{ descriptionWordCount }}/50
          <span v-if="descriptionWordCount > 50" style="color: red;">
            (Exceeds limit!)
          </span>
        </p>
      </div>
      <button type="submit" :disabled="titleWordCount > 15 || descriptionWordCount > 50">
        Save Task
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateTask",
  data() {
    return {
      newTask: {
        title: "",
        description: "",
      },
    };
  },
  computed: {
    titleWordCount() {
      return this.newTask.title.trim() ? this.newTask.title.trim().split(/\s+/).length : 0;
    },
    descriptionWordCount() {
      return this.newTask.description.trim()
        ? this.newTask.description.trim().split(/\s+/).length
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
    async createTask() {
      if (!this.validateTask()) {
        return;
      }

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const apiUrl = process.env.VUE_APP_API_URL;
        const response = await axios.post(
          `${apiUrl}/tasks`,
          {
            title: this.newTask.title,
            description: this.newTask.description,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data);

        // Emit event to parent to refresh tasks list
        this.$emit("task-created");
        this.newTask = { title: "", description: "" }; // Reset form
      } catch (error) {
        console.error("Error creating task:", error.message);
        alert("Failed to create task. Please try again.");
      }
    },
  },
};
</script>

<style scoped>

form {
  margin: auto; /* Automatically center horizontally */

  margin-top: 20px;
  max-width: 400px;
  padding: 20px;
  border: 1px solid var(--text-color);
  border-radius: 8px;
  background-color: var(--bg-color);
  color: var(--text-color);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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

<!-- <style scoped>
form {
  margin-top: 20px;
  max-width: 400px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  /* background-color: #f9f9f9; */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
  color: #333;
}

input {
  width: 100%;
  margin-bottom: 15px;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input:focus {
  border-color: #42b983;
  outline: none;
  box-shadow: 0 0 4px rgba(66, 185, 131, 0.5);
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #369f6d;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

p {
  font-size: 14px;
  color: #555;
  margin-top: -10px;
  margin-bottom: 15px;
}

p span {
  font-size: 12px;
  font-weight: bold;
}
</style> -->

  
  <!-- <style scoped>
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
  }
  </style>
   -->