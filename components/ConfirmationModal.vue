<template>
  <div class="modal-overlay">
    <div class="modal">
      <p>{{ message }}</p>
      <div class="modal-actions">
        <button @click="$emit('confirm')" class="btn-confirm">Confirmar</button>
        <button @click="$emit('cancel')" class="btn-cancel">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ConfirmationModal',
  props: {
    message: {
      type: String,
      required: true
    }
  }
})
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  z-index: 50;
  animation: fadeIn 0.2s ease;
}

.modal {
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  min-width: 300px;
  max-width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.2s ease;
}

.modal p {
  font-size: 1rem;
  color: #1f2937;
  text-align: center;
  margin-bottom: 1.5rem;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn-confirm {
  background-color: var(--danger-color);
  color: white;
  min-width: 100px;
}

.btn-cancel {
  background-color: var(--gray-color);
  color: white;
  min-width: 100px;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@media (max-width: 640px) {
  .modal-actions {
    flex-direction: column;
  }

  .modal-actions button {
    width: 100%;
  }
}
</style>
