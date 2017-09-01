import { Identifier } from "../Identifier";

export class StatusLaneId extends Identifier<string> {
    constructor(value: string = Identifier.gen()) {
        super(value);
    }
    public equals(obj: any): boolean {
        return obj instanceof StatusLaneId && obj.value === this.value;
    }

}
