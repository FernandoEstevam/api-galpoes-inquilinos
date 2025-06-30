import { PrismaClient } from '@prisma/client'
// import { FastifyBaseLogger, RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerDefault } from 'fastify'
// import { ZodTypeProvider } from 'fastify-type-provider-zod'

// export type FastifyTypeInstance = FastifyInstance<
//     RawServerDefault,
//     RawRequestDefaultExpression,
//     RawReplyDefaultExpression,
//     FastifyBaseLogger,
//     ZodTypeProvider
//   > 


declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}
