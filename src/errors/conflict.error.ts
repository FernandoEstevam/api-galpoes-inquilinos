import { AppError } from './app.error'

export class ConflictError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 409, 'CONFLICT', context)
  }
}