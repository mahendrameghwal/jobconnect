import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pluginRewriteAll from 'vite-plugin-rewrite-all';
import removeConsole from 'vite-plugin-remove-console';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), pluginRewriteAll(),  removeConsole({ exclude: ['error', 'warn'] })]
})
