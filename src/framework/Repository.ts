export default abstract class Repository {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public abstract hydrate(data: any): void;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public abstract serialize(): Record<string, unknown>;
}
