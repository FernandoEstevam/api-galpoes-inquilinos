import { AppError } from './app.error'

export class ValidationError extends AppError {
  constructor(errors: Record<string, string>) {
    super('Validation failed', 422, 'VALIDATION_ERROR', { errors })
  }
}