export abstract class Identifier<T> {
    constructor(
        readonly value: T,
        readonly isUndefined: boolean = false,
    ) { }
    public abstract equals(obj: any): boolean;
}
