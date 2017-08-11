import { List } from "immutable";
import { CardId, ColumnId, Entity, Undefined } from "../";

export interface ColumnConstructor {
    readonly id?: ColumnId;
    readonly cardIds?: List<CardId>;
    readonly name?: string;
    readonly editing?: boolean;
}

export class Column extends Entity<ColumnId>({
    cardIds: List.of(),
    name: "New Column",
    editing: false,
}) {
    constructor(params: ColumnConstructor) {
        super(params);
    }

    get name(): string { return this.get("name"); }
    get cardIds(): List<CardId> { return this.get("cardIds"); }
    get editing(): boolean { return this.get("editing"); }

    public updateName(name: string): this {
        return this.copy({ name });
    }
    public attachCard(cardId: CardId): this {
        return this.copy({ cardIds: this.cardIds.push(cardId) });
    }
    public detachCard(cardId: CardId): this {
        return this.copy({ cardIds: this.cardIds.filter(id => !id.equals(cardId)) });
    }
    public startEditing(): this {
        return this.copy({ editing: true });
    }
    public endEditing(): this {
        return this.copy({ editing: false });
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
            cardIds: List(obj.cardIds.map(id => new CardId(id))),
        },
    });
}
