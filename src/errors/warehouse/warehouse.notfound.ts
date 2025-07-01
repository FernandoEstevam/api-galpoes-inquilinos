import { AppError } from "@/errors/app.error";

export class WarehouseNotFoundError extends AppError {
  constructor(context?: Record<string, unknown>) {
    super('Warehouse not found', 404, 'WAREHOUSE_NOT_FOUND', context)
  }
}