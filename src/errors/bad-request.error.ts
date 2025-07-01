import { AppError } from './app.error'

export class BadRequestError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 400, 'BAD_REQUEST', context)
  }
}