import fp from 'fastify-plugin'
import { PrismaClient } from '@prisma/client'

export default fp(async (fastify) => {
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  })

  try {
    await prisma.$connect()
    fastify.log.info('Prisma conectado ao banco de dados')
  } catch (error) {
    fastify.log.error('Falha ao conectar ao banco de dados:', error)
    throw error
  }

  fastify.decorate('prisma', prisma)

  fastify.addHook('onClose', async (instance) => {
    await instance.prisma.$disconnect()
    fastify.log.info('Prisma desconectado do banco de dados')
  })
}, { name: 'prisma' })