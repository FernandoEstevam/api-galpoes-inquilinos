import { AppError } from "../app.error";

export class TenantNotFoundError extends AppError {
  constructor(context?: Record<string, unknown>) {
    super('Tenant not found', 404, 'TENANT_NOT_FOUND', context)
  }
}