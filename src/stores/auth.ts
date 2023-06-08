import { acceptHMRUpdate, defineStore } from 'pinia'
import { useAuth } from 'feathers-pinia'

// stores/auth.ts

export const useAuthStore = defineStore('auth', () => {
  const { api } = useFeathers()
  const auth = useAuth({ 
    api, 
    servicePath: 'users',
    idField: '_id' // DO WE NEED THIS?
  })
  auth.reAuthenticate()
  return auth
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}