import { AppError } from "@/errors/app.error";

export class WarehouseAlreadyExistsError extends AppError {
  constructor(context?: Record<string, unknown>) {
    super('Warehouse already exists', 409, 'WAREHOUSE_ALREADY_EXISTS', context)
  }
}
