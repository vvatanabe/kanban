import * as uuid from "uuid";

export abstract class Identifier<T> {
    constructor(
        readonly value: T,
        readonly isUndefined: boolean = false,
    ) { }
    public abstract equals(obj: any): boolean;
}

export namespace Identifier {
    export const gen = (): string => uuid.v4();
}
