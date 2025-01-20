<template>
  <div v-if="isVisible" class="modal" @click.self="$emit('close')">
    <div class="modal-content">
      <edit-task
        :task="task"
        @task-updated="$emit('task-updated')"
        @cancel-edit="$emit('close')"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "EditTaskModal",
  props: {
    isVisible: {
      type: Boolean,
      required: true, // Ensures the parent passes a value
    },
    task: {
      type: Object,
      required: true, // Task data is required for editing
    },
  },
};
</script>

<style scoped>
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
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
}
</style>
