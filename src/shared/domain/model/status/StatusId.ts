import { Identifier } from "../";

export class StatusId extends Identifier<string> {
    constructor(value: string = Identifier.gen()) {
        super(value);
    }
    public equals(obj: any): boolean {
        return obj instanceof StatusId && obj.value === this.value
    }
}

export namespace StatusId {
    export function create(value: string): StatusId {
        return new StatusId(value);
    }
}