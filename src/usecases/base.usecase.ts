export abstract class BaseUseCase<Input = void, OutputInput = void> {
  abstract execute(input: Input): Promise<OutputInput>
  protected abstract process(input: Input): void
}