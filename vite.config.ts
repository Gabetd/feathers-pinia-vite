import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { feathersPiniaAutoImport } from 'feathers-pinia'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE || '',
  server: {
    host: true
  },
  resolve: {
    alias: {
      '#src/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  plugins: [
    Vue({
      reactivityTransform: true,
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        'vue/macros',
        '@vueuse/head',
        '@vueuse/core',
        feathersPiniaAutoImport,
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables', 'src/models', 'src/stores'],
      vueTemplate: true,
    }),

    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/components.d.ts',
      types: [
        {
          from: 'vue-router',
          names: ['RouterLink', 'RouterView'],
        },
      ],
      resolvers: [
        IconsResolver(),
        (name: string) => {
          if (name.match(/^Daisy[A-Z]/)) return { name, from: 'daisy-ui-kit' }
        },
      ],
    }),

    // // https://github.com/antfu/unplugin-icons#migrate-from-vite-plugin-icons
    Icons(),
  ],
})

