import { List, Record } from "immutable";
import { Board, BoardConstructor, BoardId, BoardType, CardModal, ColumnId } from "../";

interface KanbanBoardConstructor extends BoardConstructor {
    readonly columnIds: List<ColumnId>;
}

const defaultValues: KanbanBoardConstructor = {
    id: new BoardId(),
    type: BoardType.KanbanBoard,
    name: "New Kanban Board",
    cardModal: CardModal.create({}),
    editing: false,
    columnIds: List.of(),
};

export class KanbanBoard extends Board(defaultValues) {

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

    public equals(obj: any): boolean {
        return obj instanceof KanbanBoard && this.id.equals(obj.id);
    }

    public toPlaneObject(): { [key: string]: any } {
        const obj = this.toJS();
        return {
            ...obj,
            ...{
                id: this.id.value,
                columnIds: this.columnIds.map(id => id.value),
            },
        };
    }
}

export namespace KanbanBoard {
    export const fromJs = (obj: any): KanbanBoard => new KanbanBoard({
        ...obj,
        id: new BoardId(obj.id),
        columnIds: List.of(obj.columnIds.map(id => new KanbanBoard(id))),
    });
    export const create = (name: string): KanbanBoard => new KanbanBoard({ ...defaultValues, ...{ name } });
}
