export abstract class BaseUseCase<Input,OutputInput> {
  abstract execute(input: Input): Promise<OutputInput>
  protected abstract process(input: Input): void
}