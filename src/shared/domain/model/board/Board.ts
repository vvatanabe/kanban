import { List, Record } from "immutable";
import { BoardId, BoardType, CardModal, Entity, KanbanBoard, ScrumBoard, Mixin, ScrumBoard } from "../";

interface BoardConstructor {
    readonly id?: BoardId;
    readonly type?: BoardType;
    readonly name?: string;
    readonly cardModal?: CardModal;
    readonly editing?: boolean;
}

// readonly type?: BoardType;
// readonly kanbanBoard?: KanbanBoard;
// readonly scrumBoard?: ScrumBoard;

const defaulValues: BoardConstructor = {
    id: new BoardId(),
    type: undefined,
    name: "New Board",
    cardModal: CardModal.create({}),
    editing: false,
};

// type: BoardType.KanbanBoard,
// kanbanBoard: KanbanBoard.create({}),
// scrumBoard: ScrumBoard.create({}),

export const Board = <S>(values: any) => {
    return class BoardClass extends Entity<BoardId>({
        defaulValues,
        ...values,
    }) {

        get name(): string { return this.get("name"); }
        get type(): string { return this.get("type"); }
        get cardModal(): CardModal { return this.get("cardModal"); }
        get editing(): boolean { return this.get("editing"); }
        get shouldBeOpenCardModal(): boolean { return this.cardModal.hasCardId; }

        get structure(): S { return this.get("structure"); }

        public updateName(name: string): this {
            return this.copy({ name });
        }

        public startEditing(): this {
            return this.copy({ editing: true });
        }

        public endEditing(): this {
            return this.copy({ editing: false });
        }

    };
};

export namespace BoardFactory {
    export const fromJs = (obj: any): KanbanBoard => new KanbanBoard({
        ...obj,
        columnIds: List.of(obj.columnIds.map(columnId => new ColumnId(columnId))),
    });
    export const create = (params: {
        columnIds?: List<ColumnId>;
    }): KanbanBoard => new KanbanBoard(params);
}

interface KanbanBoardConstructor {
    readonly type?: BoardType;
    readonly columnIds?: List<ColumnId>;
}

const kanbanBoardDefaulValues: KanbanBoardConstructor = {
    type: BoardType.KanbanBoard,
    columnIds: List.of(),
};


interface BoardConstructor {
    readonly id?: BoardId;
    readonly type?: BoardType;
    readonly name?: string;
    readonly cardModal?: CardModal;
    readonly editing?: boolean;
    readonly columnIds?: List<ColumnId>;
}

const obj = JSON.parse("");

obj.boards.map(board => {
    return board.type === BoardType.KanbanBoard ? KanbanBoard.fromJs(board)
})

KanbanBoard.fromJs(json);
ScrunBoard

class KanbanBoard extends Board<>(kanbanBoardDefaulValues) {

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








export class Board2 extends Entity<BoardId>(defaulValues) {

    get name(): string { return this.get("name"); }
    get type(): string { return this.get("type"); }
    get cardModal(): CardModal { return this.get("cardModal"); }
    get editing(): boolean { return this.get("editing"); }

    get kanbanBoard(): KanbanBoard { return this.get("kanbanBoard"); }
    get scrumBoard(): ScrumBoard { return this.get("scrumBoard"); }

    get shouldBeOpenCardModal(): boolean { return this.cardModal.hasCardId; }

    public equals(obj: any): boolean {
        return obj instanceof Board && obj.id.equals(this.id);
    }

    public attachColumnToKanban(columnId: ColumnId): KanbanBoard {
        this.kanbanBoard.attachColumn(columnId);
        return this.merge({ columnIds: this.columnIds.push(columnId) }) as KanbanBoard;
    }

    public detachColumnFromKanban(columnId: ColumnId): KanbanBoard {
        return this.merge({ columnIds: this.columnIds.filter(id => !id.equals(columnId)) }) as KanbanBoard;
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
