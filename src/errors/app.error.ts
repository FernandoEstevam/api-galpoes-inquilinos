export class AppError extends Error {
  public readonly isAppError = true
  public readonly statusCode: number
  public readonly code: string
  public readonly context?: Record<string, unknown>

  constructor(message: string, statusCode: number, code: string, context?: Record<string, unknown>) {
    super(message)
    this.name = this.constructor.name
    this.statusCode = statusCode
    this.code = code
    this.context = context

    Error.captureStackTrace(this, this.constructor)
  }
}