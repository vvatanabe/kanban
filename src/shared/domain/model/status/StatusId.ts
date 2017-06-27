import { Identifier } from "./Identifier";

export class StatusId implements Identifier<string> {
    readonly isUndefined: boolean = false;
    constructor(readonly value: string) {}
    equals(obj: any): boolean {
        return obj instanceof StatusId && obj.value === this.value
    }
}
export namespace StatusId {
    export function create(value: string): StatusId {
        return new StatusId(value);
    }
}