import { Identifier } from "../Identifier";

export class KanbanBoardId extends Identifier<string> {
    constructor(value: string = Identifier.gen()) {
        super(value);
    }
    public equals(obj: any): boolean {
        return obj instanceof KanbanBoardId && obj.value === this.value;
    }
}
