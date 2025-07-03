import Fastify from 'fastify'
import prismaPlugin from './plugins/prisma'
import { TenantRoutes } from './routes/tenant.routes'
import { env } from './env'
import { fastifyCors } from '@fastify/cors'
import { validatorCompiler, serializerCompiler, jsonSchemaTransform } from 'fastify-type-provider-zod'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { AppError } from './erros/app.error'
import { WarehouseRoutes } from './routes/warehouse.routes'
import { RentalContractRoutes } from './routes/rentalContract.routes'
import { NotFoundError } from './errors/not-found.error'

const app = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, { origin: '*' })

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Typed Api',
      version: '1.0.0'
    }
  },
  transform: jsonSchemaTransform
})

app.register(prismaPlugin)
app.register(fastifySwaggerUi, { routePrefix: '/documentation' })
app.register(TenantRoutes, { prefix: '/api/tenant' })
app.register(WarehouseRoutes, { prefix: '/api/warehouse' })
app.register(RentalContractRoutes, { prefix: '/api/rental-contract' })

app.setErrorHandler((error, request, reply) => {
  if ((error as any)?.isAppError) {
    const appError = error as AppError
    return reply.status(appError.statusCode).send({
      statusCode: appError.statusCode,
      message: appError.message,
      code: appError.code,
      context: appError.context,
    })
  }


  // Zod errors (validação)
  if (error.name === 'ZodError') {
    return reply.status(400).send({
      statusCode: 400,
      message: 'Validation failed',
      code: 'VALIDATION_ERROR',
      issues: (error as any).issues,
    })
  }

  // 🔹 Fastify (AJV) validation error
  if (error.validation && error.code === 'FST_ERR_VALIDATION') {
    return reply.status(400).send({
      statusCode: 400,
      code: error.code,
      message: error.message,
      validation: error.validation,
      validationContext: error.validationContext,
    })
  }

  // Erros do Prisma (ex: Unique constraint, NotFound, etc.)
  if (error.code?.startsWith?.('P')) {
    return reply.status(400).send({
      statusCode: 400,
      message: 'Erro de banco de dados',
      code: error.code,
      meta: error.meta,
    })
  }

  // 🚨 Captura e loga erro interno
  console.error('[INTERNAL ERROR]', {
    message: error.message,
    stack: error.stack,
    name: error.name,
    cause: (error as any).cause,
    code: (error as any).code,
    route: request.url,
    method: request.method,
    body: request.body,
    params: request.params,
    query: request.query,
  })

  return reply.status(500).send({
    statusCode: 500,
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR',
  })
})



app.listen({ port: Number(env.PORT), host: '0.0.0.0' }) // host adicionado para facilitar testes em containers ou rede local
  .then((address) => {
    console.log(`🚀 Server running at ${address}`)
  })
  .catch((err) => {
    app.log.error(err)
    process.exit(1)
  })
