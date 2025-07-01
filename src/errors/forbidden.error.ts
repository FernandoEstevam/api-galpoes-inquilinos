import { AppError } from './app.error'

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden', context?: Record<string, unknown>) {
    super(message, 403, 'FORBIDDEN', context)
  }
}