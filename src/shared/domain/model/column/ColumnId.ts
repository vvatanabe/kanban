import { Identifier } from "../";

export class ColumnId extends Identifier<string> {
    constructor(value: string = Identifier.gen()) {
        super(value);
    }
    public equals(obj: any): boolean {
        return obj instanceof ColumnId && obj.value === this.value;
    }
}
