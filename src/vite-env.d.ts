/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare namespace NodeJS {
    export interface Process {
        server: boolean // Remove for Nuxt
    }
}

// Nuxt stuff
declare global {
  interface Window {
    __NUXT__: any
  }
  function rest(): any;
  function defineNuxtPlugin(): any;
}