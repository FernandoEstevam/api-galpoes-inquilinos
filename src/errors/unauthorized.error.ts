import { AppError } from './app.error'

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized', context?: Record<string, unknown>) {
    super(message, 401, 'UNAUTHORIZED', context)
  }
}