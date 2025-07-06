export abstract class BaseRepository<
  T, 
  CreateInput, 
  UpdateInput, 
  IdType=string
> {
  abstract findById(id: IdType): Promise<T | null>
  abstract findAll(): Promise<T[]>
  abstract create(data: CreateInput): Promise<T>
  abstract update(id: IdType, data: UpdateInput): Promise<T>
  abstract delete(id: IdType): Promise<void>
}