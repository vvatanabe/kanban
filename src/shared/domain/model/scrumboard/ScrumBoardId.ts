import { Identifier } from "../";

export class ScrumBoardId extends Identifier<string> {
    constructor(value: string) {
        super(value);
    }
    public equals(obj: any): boolean {
        return obj instanceof ScrumBoardId && obj.value === this.value;
    }
}
