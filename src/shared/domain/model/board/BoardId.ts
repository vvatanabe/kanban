import { Identifier } from "../Identifier";

export class BoardId extends Identifier<string> {
    constructor(value: string = Identifier.gen()) {
        super(value);
    }
    public equals(obj: any): boolean {
        return obj instanceof BoardId && obj.value === this.value;
    }
}
