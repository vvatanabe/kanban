import { Identifier } from "../Identifier";

export default class KanbanBoardId implements Identifier<string> {

    public static create(value: string): KanbanBoardId {
        return new KanbanBoardId(value);
    }

    constructor(
        readonly value: string,
        readonly isUndefined: boolean = false,
    ) { }

    public equals(obj: any): boolean {
        return obj instanceof KanbanBoardId && obj.value === this.value;
    }
}
