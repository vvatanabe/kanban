import { Identifier } from "../";

export class ProjectId extends Identifier<string> {
    constructor(value: string = Identifier.gen()) {
        super(value);
    }
    public equals(obj: any): boolean {
        return obj instanceof ProjectId && obj.value === this.value;
    }
}
