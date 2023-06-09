// API types from Feathers Dove server
import  { createClient } from 'feathers-pinia-api'
// socket.io imports for the browser
import  FSIOCPkg from '@feathersjs/socketio-client'
import  io from 'socket.io-client'
import  { useStorage } from '@vueuse/core'
import  { OFetch, createPiniaClient } from 'feathers-pinia'
import  { createPinia } from 'pinia'
import  { setupUser } from './models/user.js'
import  { setupTask } from './models/task.js'

const socketio = FSIOCPkg.default // TODO: PR A FIX
export const pinia = createPinia() // TODO

const definePlugin = ((_nuxt?: any) => { // defineNuxtPlugin
  // const host = import.meta.env.VITE_MYAPP_API_URL as string || 'http://localhost:3030'
  const host = 'https://feathers-pinia-api-1.Gabetd.repl.co' // TODO
  
  // Store JWT in SSG-compatible storage
  const storageKey = 'feathers-jwt'
  const jwt = useStorage(storageKey, '')
  const storage = {
    getItem: () => jwt.value,
    setItem: (key: string, val: string) => (jwt.value = val),
    removeItem: () => (jwt.value = null),
  }
  
  // Use Rest for the SSR Server and socket.io for the browser
  const connection = // globalThis.process?.server
    // ? rest(host).fetch($fetch, OFetch) :
    socketio(io(host, { transports: ['websocket'] }))
  
  const feathers = createClient(connection, { storage, storageKey })
  const api = createPiniaClient(
    feathers, {
      pinia: pinia, // nuxt.$pinia,
      idField: '_id',
      // ssr: !!process.server,
      whitelist: ['$regex'],
      paramsForServer: [],
      services: {
        users: {
          setupInstance: setupUser,
        },
        tasks: {
          setupInstance:setupTask,
          skipGetIfExists: true
        },
      }
    }
  )

 feathers.service('contacts').hooks({
    around: {
      all: [
        async (context, next) => {
          // await timeout(1000) TODO: 
          await next()
        },
      ],
    },
  })

  return {
    provide: { api },
  }
})
export const api = (globalThis as any).defineNuxtPlugin ?
  (globalThis as any).defineNuxtPlugin(async (nuxt: any) => definePlugin(nuxt)) :
  definePlugin().provide.api // Nuxt

