import { AppError } from './app.error'

export class NotFoundError extends AppError {
  constructor(entity: string, context?: Record<string, unknown>) {
    super(`${entity} not found`, 404, `${entity.toUpperCase()}_NOT_FOUND`, context)
  }
}