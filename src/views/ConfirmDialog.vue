<template>
    <div class="confirm-dialog" v-if="isVisible">
      <div class="confirm-dialog-overlay"></div>
      <div class="confirm-dialog-content">
        <p class="confirm-dialog-message" style="color: red;">
          Are you sure you want to delete this task?
        </p>
        <div class="confirm-dialog-actions">
          <button @click="confirm" class="confirm-btn">Yes</button>
          <button @click="cancel" class="cancel-btn">No</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
    },
    methods: {
      confirm() {
        this.$emit("confirm");
      },
      cancel() {
        this.$emit("cancel");
      },
    },
  };
  </script>
  
  <style>
  .confirm-dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .confirm-dialog-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  .confirm-dialog-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    z-index: 1001;
    text-align: center;
  }
  .confirm-dialog-message {
    margin-bottom: 20px;
    font-size: 16px;
  }
  .confirm-dialog-actions button {
    margin: 0 10px;
  }
  .confirm-btn {
    background-color: red;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }
  .cancel-btn {
    background-color: gray;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }
  </style>
  