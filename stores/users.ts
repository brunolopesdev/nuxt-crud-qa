import { defineStore } from 'pinia'
import type { User } from '~/types/user'

interface UsersState {
  users: User[]
  nextId: number
}

export const useUsersStore = defineStore('users', {
  state: (): UsersState => ({
    users: [],
    nextId: 1
  }),

  getters: {
    getUsers: (state) => state.users,
    getUserById: (state) => (id: number) => state.users.find(user => user.id === id)
  },

  actions: {
    addUser(userData: Omit<User, 'id'>) {
      const user: User = {
        ...userData,
        id: this.nextId++
      }
      this.users.push(user)
    },

    updateUser(user: User) {
      const index = this.users.findIndex(u => u.id === user.id)
      if (index !== -1) {
        this.users[index] = { ...user }
      }
    },

    deleteUser(id: number) {
      const index = this.users.findIndex(u => u.id === id)
      if (index !== -1) {
        this.users.splice(index, 1)
      }
    }
  }
})
