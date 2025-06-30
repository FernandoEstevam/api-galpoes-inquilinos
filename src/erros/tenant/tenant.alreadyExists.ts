import { AppError } from "../app.error";

export class TenantAlreadyExistsError extends AppError {
  constructor(context?: Record<string, unknown>) {
    super('Tenant already exists', 409, 'TENANT_ALREADY_EXISTS', context)
  }
}
