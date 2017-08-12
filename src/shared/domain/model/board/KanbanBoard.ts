import { List } from "immutable";
import { Board, BoardId, CardModal, ColumnId } from "../";


interface KanbanBoardConstructor {
    readonly id?: BoardId;
    readonly name?: string;
    readonly cardModal?: CardModal;
    readonly editing?: boolean;
    readonly columnIds?: List<ColumnId>;
}

const defaulValues: KanbanBoardConstructor = {
    id: new BoardId(),
    name: "New Board",
    cardModal: CardModal.create({}),
    editing: false,
    columnIds: List.of(),
};

export class KanbanBoard extends Board(defaulValues) {

    constructor(params: KanbanBoardConstructor) {
        super(params);
    }

    get columnIds(): List<ColumnId> { return this.get("columnIds"); }

    public equals(obj: any): boolean {
        return obj instanceof KanbanBoard && obj.id.equals(this.id);
    }

    public attachColumn(columnId: ColumnId): this {
        return this.copy({ columnIds: this.columnIds.push(columnId) });
    }

    public detachColumn(columnId: ColumnId): this {
        return this.copy({ columnIds: this.columnIds.filter(id => !id.equals(columnId)) });
    }

}

export namespace KanbanBoard {
    export const fromJs = (obj: any): KanbanBoard => new KanbanBoard({
        ...obj,
        id: new BoardId(obj.id),
        columnIds: List.of(obj.columnIds.map(columnId => new ColumnId(columnId))),
    });
    export const create = (params: {
        name?: string;
        columnIds?: List<ColumnId>;
        cardModal?: CardModal;
    }): KanbanBoard => new KanbanBoard(params);
}
