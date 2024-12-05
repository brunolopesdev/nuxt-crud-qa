<template>
  <div class="user-form">
    <h2>{{ isEdit ? 'Editar' : 'Novo' }} Usuário</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="nome">Nome*</label>
        <input
          id="nome"
          v-model="form.nome"
          type="text"
          required
          @blur="validateField('nome')"
        >
        <span v-if="errors.nome" class="error">{{ errors.nome }}</span>
      </div>

      <div class="form-group">
        <label for="cpf">CPF*</label>
        <input
          id="cpf"
          v-model="form.cpf"
          type="text"
          required
          @input="maskCPF"
          @blur="validateField('cpf')"
        >
        <span v-if="errors.cpf" class="error">{{ errors.cpf }}</span>
      </div>

      <div class="form-group">
        <label for="username">Username*</label>
        <input
          id="username"
          v-model="form.username"
          type="text"
          required
          @blur="validateField('username')"
        >
        <span v-if="errors.username" class="error">{{ errors.username }}</span>
      </div>

      <div class="form-group">
        <label for="email">Email*</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          @blur="validateField('email')"
        >
        <span v-if="errors.email" class="error">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label for="grupo">Grupo*</label>
        <input
          id="grupo"
          v-model="form.grupo"
          type="text"
          required
          @blur="validateField('grupo')"
        >
        <span v-if="errors.grupo" class="error">{{ errors.grupo }}</span>
      </div>

      <div class="form-actions">
        <button type="button" @click="$router.push('/')" class="btn-cancel">
          Cancelar
        </button>
        <button type="submit" class="btn-save" :disabled="hasErrors">
          Salvar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useUsersStore } from '~/stores/users'

const props = defineProps<{
  userId?: number
}>()

const router = useRouter()
const store = useUsersStore()

const form = reactive({
  nome: '',
  cpf: '',
  username: '',
  email: '',
  grupo: ''
})

const errors = reactive({
  nome: '',
  cpf: '',
  username: '',
  email: '',
  grupo: ''
})

const isEdit = computed(() => !!props.userId)
const hasErrors = computed(() => Object.values(errors).some(error => !!error))

onMounted(() => {
  if (isEdit.value) {
    const user = store.getUserById(props.userId)
    if (user) {
      Object.assign(form, user)
    }
  }
})

function maskCPF(event: Event) {
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/\D/g, '')
  if (value.length <= 11) {
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  }
  form.cpf = value
}

function validateField(field: string) {
  errors[field] = ''

  switch (field) {
    case 'email':
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = 'Email inválido'
      }
      break
    case 'cpf':
      if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(form.cpf)) {
        errors.cpf = 'CPF inválido'
      }
      break
    case 'nome':
      if (!form.nome.trim()) {
        errors.nome = 'Nome é obrigatório'
      }
      break
  }
}

function validateForm() {
  ['nome', 'cpf', 'username', 'email', 'grupo'].forEach(field => {
    validateField(field)
  })
  return !hasErrors.value
}

function handleSubmit() {
  if (!validateForm()) return

  const userData = { ...form }

  if (isEdit.value) {
    store.updateUser({ ...userData, id: props.userId })
  } else {
    store.addUser(userData)
  }

  router.push('/')
}
</script>

<style>
.user-form {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.user-form h2 {
  color: #1f2937;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #4b5563;
}

input {
  width: 100%;
  padding: 0.625rem;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: border-color 0.2s ease;
}

input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.error {
  color: var(--danger-color);
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .user-form {
    margin: 1rem;
    padding: 1rem;
  }

  .form-actions {
    flex-direction: column;
  }

  .form-actions button {
    width: 100%;
  }
}
</style>
