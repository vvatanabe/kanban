import { List, Record } from "immutable";
import { ColumnId } from "../";

interface KanbanBoardConstructor {
    readonly columnIds?: List<ColumnId>;
}

const defaulValues: KanbanBoardConstructor = {
    columnIds: List.of(),
};

export class KanbanBoard extends Record(defaulValues) {

    constructor(params: KanbanBoardConstructor) {
        super(params);
    }

    get columnIds(): List<ColumnId> { return this.get("columnIds"); }

    public attachColumn(columnId: ColumnId): KanbanBoard {
        return this.merge({ columnIds: this.columnIds.push(columnId) }) as KanbanBoard;
    }

    public detachColumn(columnId: ColumnId): KanbanBoard {
        return this.merge({ columnIds: this.columnIds.filter(id => !id.equals(columnId)) }) as KanbanBoard;
    }

}

export namespace KanbanBoard {
    export const fromJs = (obj: any): KanbanBoard => new KanbanBoard({
        ...obj,
        columnIds: List.of(obj.columnIds.map(columnId => new ColumnId(columnId))),
    });
    export const create = (params: {
        columnIds?: List<ColumnId>;
    }): KanbanBoard => new KanbanBoard(params);
}
