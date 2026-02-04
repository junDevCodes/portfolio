import { env } from 'prisma/config'
import { defineConfig } from 'prisma'

export default defineConfig({
  datasources: {
    db: {
      url: env('DATABASE_URL'),
    },
  },
})
