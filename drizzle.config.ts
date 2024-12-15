import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/drizzle/schema.ts',
  out: './src/drizzle/migrations',
  driver: 'pglite',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },

  strict: true,
  verbose: true,
})
