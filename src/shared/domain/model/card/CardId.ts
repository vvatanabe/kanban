import { Identifier } from "../";

export class CardId extends Identifier<string> {
    constructor(value: string = Identifier.gen()) {
        super(value);
    }
    public equals(obj: any): boolean {
        return obj instanceof CardId && obj.value === this.value;
    }
}
