<template>
    <div>
        <ul v-if="tasks.length > 0">
            <li v-for="task in filteredAndSortedTasks" :key="task.id" :class="{ 'task-completed': task.completed }">
                <div @click="openTaskPopup(task)" class="task-container">
                    <div class="task-title">
                        Title: {{ getTruncatedTitle(task.title) }}
                    </div>
                    <div class="task-description">
                        Description: {{ getTruncatedDescription(task.description) }}
                    </div>
                    <div class="task-status" v-if="task.completed">
                        Completed: <strong>Yes</strong>
                    </div>
                    <div class="task-dates">
                        <!-- <small>Created: {{ formatDate(task.createdAt) }}</small> | -->
                        <!-- <small>Updated: {{ formatDate(task.updatedAt) }}</small> -->
                    </div>
                </div>
                <div class="task-actions">
                    <button @click="$emit('edit-task', task)">Edit</button>
                    <button @click="$emit('delete-task', task._id)">Delete</button>
                </div>
            </li>
        </ul>
        <p v-else>No tasks available.</p>

        <!-- Popup should be rendered outside of the list structure -->
        <DisplaySingleTaskPopup v-if="selectedTask" :task="selectedTask" @close-popup="closePopup" />
    </div>
</template>

<style scoped>
ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 20px;
    list-style: none;
    /* Remove default list style (dots) */
}

li {
    margin: 15px;
    border: 2px solid var(--task-border-color);
    border-radius: 15px;
    padding: 20px;
    background-color: var(--bg-color);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 300px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

li:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

li.task-completed {
    background-color: var(--user-nav-text-background-color);
    border-color: var(--user-nav-text-color);
}

.task-container {
    margin-bottom: 15px;
    font-size: 1.1em;
    cursor: pointer;
}

.task-title,
.task-description {
    margin-bottom: 8px;
}

.task-status {
    margin-top: 5px;
    color: var(--user-nav-text-color);
    font-weight: bold;
}

.task-dates {
    font-size: 0.8em;
    color: var(--text-date-color);
}

.task-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
}

button {
    background-color: var(--navbar-bg-color);
    color: var(--navbar-text-color);
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    width: 45%;
}

button:hover {
    background-color: darken(var(--navbar-bg-color), 10%);
}

button:last-child {
    background-color: #e74c3c;
}

button:last-child:hover {
    background-color: darken(#e74c3c, 10%);
}
</style>

<script>
import DisplaySingleTaskPopup from '../DisplaySingleTaskPopup.vue';

export default {
    name: "TaskList",
    components: {
        DisplaySingleTaskPopup
    },
    props: {
        tasks: Array,
        filteredAndSortedTasks: Array
    },
    data() {
        return {
            selectedTask: null
        };
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
        },
        openTaskPopup(task) {
            this.selectedTask = task;  // Set the task to show in the popup
        },
        closePopup() {
            this.selectedTask = null;  // Close the popup
        }
    }
};
</script>
