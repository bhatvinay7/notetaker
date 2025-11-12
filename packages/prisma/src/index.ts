import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

declare global {
  var prismaGlobal: PrismaClient | undefined
}

if (!globalThis.prismaGlobal) {
  globalThis.prismaGlobal = new PrismaClient({
    log: ['error', 'warn'],
  })
}
prisma = globalThis.prismaGlobal

export default prisma
