import { List } from "immutable";
import { CardId, ColumnId, Entity, EntityConstructor } from "../";

export interface ColumnConstructor extends EntityConstructor<ColumnId> {
    readonly name: string;
    readonly cardIds: List<CardId>;
}

const defaultValues: ColumnConstructor = {
    id: new ColumnId(),
    editing: false,
    name: "",
    cardIds: List.of(),
};

export class Column extends Entity<ColumnId>(defaultValues) {

    get name(): string { return this.get("name"); }
    get cardIds(): List<CardId> { return this.get("cardIds"); }

    constructor(params: ColumnConstructor) {
        super(params);
    }

    public updateName(name: string): Column {
        return this.merge({ name }) as Column;
    }
    public attachCard(cardId: CardId): Column {
        return this.merge({ cardIds: this.cardIds.push(cardId) }) as Column;
    }
    public detachCard(cardId: CardId): Column {
        return this.merge({ cardIds: this.cardIds.filter(id => !id.equals(cardId)) }) as Column;
    }
    public moveCard(srcId: CardId, distId: CardId): Column {
        const srcIndex = this.cardIds.findIndex(id => id.equals(srcId));
        const distIndex = this.cardIds.findIndex(id => id.equals(distId));
        const cardIds = this.cardIds.delete(srcIndex).insert(distIndex, srcId);
        return this.merge({ cardIds }) as Column;
    }

    public hasCard(id: CardId): boolean {
        return this.cardIds.some(cardId => cardId.equals(id));
    }

    public equals(obj: any): boolean {
        return obj instanceof Column && obj.id.equals(this.id);
    }

    public toJS(): any {
        const obj = super.toJS();
        return {
            ...obj,
            ...{
                id: obj.id.value,
                cardIds: obj.cardIds.map(cardId => cardId.value),
            },
        };
    }

}

export namespace Column {
    export const fromJs = (obj: any): Column => new Column({
        ...obj,
        ...{
            id: new ColumnId(obj.id),
            cardIds: List.of<CardId>(obj.cardIds.map(id => new CardId(id))),
        },
    });
    export const create = (name: string): Column => new Column({
        ...defaultValues,
        ...{ name },
    });
}
