<template>
  <div class="user-list">
    <div class="header">
      <h2>Lista de Usuários</h2>
      <button @click="$router.push('/user/new')" class="btn-add">
        Adicionar Usuário Teste
      </button>
    </div>

    <table>
      <thead>
        <tr>
          <th>Nome Teste</th>
          <th>CPF Teste</th>
          <th>Username Teste</th>
          <th>Email Teste</th>
          <th>Grupo Teste</th>
          <th>Ações Teste</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td data-label="Nome">{{ user.nome }}</td>
          <td data-label="CPF">{{ user.cpf }}</td>
          <td data-label="Username">{{ user.username }}</td>
          <td data-label="Email">{{ user.email }}</td>
          <td data-label="Grupo">{{ user.grupo }}</td>
          <td class="actions">
            <button @click="$router.push(`/user/edit/${user.id}`)" class="btn-edit">
              Editar
            </button>
            <button @click="confirmDelete(user)" class="btn-delete">
              Excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <ConfirmationModal
      v-if="showDeleteModal"
      @confirm="handleDelete"
      @cancel="showDeleteModal = false"
      message="Tem certeza que deseja excluir este usuário?"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUsersStore } from '~/stores/users'
import type { User } from '~/types/user'

const store = useUsersStore()
const { users } = storeToRefs(store)
const showDeleteModal = ref(false)
const userToDelete = ref<User | null>(null)

function confirmDelete(user: User) {
  userToDelete.value = user
  showDeleteModal.value = true
}

function handleDelete() {
  if (userToDelete.value) {
    store.deleteUser(userToDelete.value.id)
    showDeleteModal.value = false
    userToDelete.value = null
  }
}
</script>

<style>
.user-list {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.header h2 {
  color: #1f2937;
  font-size: 1.5rem;
  font-weight: 600;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th {
  background-color: #f8fafc;
  font-weight: 600;
  color: #4b5563;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}

th, td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

tr:hover {
  background-color: #f8fafc;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.btn-add {
  background-color: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-edit {
  background-color: var(--primary-color);
  color: white;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}

.btn-delete {
  background-color: var(--danger-color);
  color: white;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .user-list {
    padding: 1rem;
  }

  .header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  table, thead, tbody, tr, th, td {
    display: block;
  }

  thead tr {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  tr {
    background-color: white;
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    padding: 1rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  td {
    padding: 0.5rem 0;
    border-bottom: none;
    position: relative;
    padding-left: 50%;
    text-align: right;
  }

  td::before {
    content: attr(data-label);
    position: absolute;
    left: 0;
    width: 45%;
    text-align: left;
    font-weight: 600;
    color: #4b5563;
  }

  .actions {
    padding-left: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .actions button {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .actions {
    grid-template-columns: 1fr;
  }
}
</style>
