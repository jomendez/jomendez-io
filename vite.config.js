import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const REQUIRED_BUILD_ENV = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
]

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  if (command === 'build') {
    const env = loadEnv(mode, process.cwd(), '')
    const missing = REQUIRED_BUILD_ENV.filter((k) => !env[k])
    if (missing.length) {
      throw new Error(
        `\n\n[build aborted] Missing required env vars: ${missing.join(', ')}\n` +
          `Local: set them in .env. CI: set them in repo secrets (GitHub → Settings → Secrets and variables → Actions).\n`,
      )
    }
  }
  return { plugins: [react()] }
})
