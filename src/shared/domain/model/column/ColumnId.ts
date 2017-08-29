import { Identifier } from "../";

export class ColumnId extends Identifier<string> {
    constructor(value: string = Identifier.gen()) {
        super(value);
    }
    public equals(obj: any): boolean {
        return obj instanceof ColumnId && obj.value === this.value;
    }
}

export class ColumnCardId extends Identifier<[ColumnId, CardId]> {
    constructor(columnId: ColumnId, cardId: CardId) {
        super([columnId, cardId]);
    }
    public equals(obj: any): boolean {
        return obj instanceof ColumnCardId
            && obj.value[0] === this.value[0]
            && obj.value[1] === this.value[1];
    }
}