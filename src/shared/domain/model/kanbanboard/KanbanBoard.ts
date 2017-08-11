import { List } from "immutable";
import { CardModal, ColumnId, Entity, KanbanBoardId, Undefined } from "../";

interface KanbanBoardConstructor {
    readonly id?: KanbanBoardId;
    readonly name?: string;
    readonly columnIds?: List<ColumnId>;
    readonly editing?: boolean;
    readonly cardModal?: CardModal;
}

export class KanbanBoard extends Entity<KanbanBoardId>({
    id: new Undefined(),
    name: "New Board",
    columnIds: List.of<ColumnId>(),
    editing: false,
    cardModal: new CardModal(),
}) {
    constructor(params: KanbanBoardConstructor = {}) {
        super(params);
    }

    get name(): string { return this.get("name"); }
    get columnIds(): List<ColumnId> { return this.get("columnIds"); }
    get editing(): boolean { return this.get("editing"); }
    get cardModal(): CardModal { return this.get("cardModal"); }
    get shouldBeOpenCardModal(): boolean { return this.cardModal.hasCardId; }

    public equals(obj: any): boolean {
        return obj instanceof KanbanBoard && obj.id.equals(this.id);
    }

    public attachColumn(columnId: ColumnId): this {
        return this.copy({ columnIds: this.columnIds.push(columnId) });
    }

    public detachColumn(columnId: ColumnId): this {
        return this.copy({ columnIds: this.columnIds.filter(id => !id.equals(columnId)) });
    }

    public updateName(name: string): this {
        return this.copy({ name });
    }

    public startEditing(): this {
        return this.copy({ editing: true });
    }

    public endEditing(): this {
        return this.copy({ editing: false });
    }
}

export namespace KanbanBoard {
    export const fromJs = (obj: any): KanbanBoard => new KanbanBoard({
        ...obj,
        id: new KanbanBoardId(obj.id),
        columnIds: List.of(obj.columnIds.map(id => new ColumnId(id))),
    });
}
