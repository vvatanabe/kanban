import { List, Record } from "immutable";
import CardModal from "../cardmodal/CardModal";
import ColumnId from "../column/ColumnId";
import Undefined from "../Undefined";
import KanbanBoardId from "./KanbanBoardId";

interface KanbanBoardConstructor {
    readonly id?: KanbanBoardId;
    readonly name?: string;
    readonly columnIds?: List<ColumnId>;
    readonly editing?: boolean;
    readonly cardModal?: CardModal;
}

const KANBAN_BOARD_DEFAULT_VALUES: KanbanBoardConstructor = {
    id: new Undefined(),
    name: "New Board",
    columnIds: List.of<ColumnId>(),
    editing: false,
    cardModal: undefined,
};

export default class KanbanBoard extends Record(KANBAN_BOARD_DEFAULT_VALUES) {

    public static fromJs(obj: any): KanbanBoard {
        return new KanbanBoard({
            ...obj,
            id: KanbanBoardId.create(obj.id),
            columnIds: List.of(obj.columnIds.map(id => ColumnId.create(id))),
        });
    }

    constructor(params: KanbanBoardConstructor) {
        super(params);
    }

    public id = (): KanbanBoardId => this.get("id");
    public name = (): string => this.get("name");
    public columnIds = (): List<ColumnId> => this.get("columnIds");
    public editing = (): boolean => this.get("editing");
    public cardModal = (): CardModal => this.get("cardModal");

    public equals(obj: any): boolean {
        return obj instanceof KanbanBoard && obj.id().equals(this.id());
    }

    public attachColumn(columnId: ColumnId): KanbanBoard {
        const statusLaneIds = this.columnIds().push(columnId);
        return this.merge({ statusLaneIds }) as KanbanBoard;
    }

    public detachColumn(columnId: ColumnId): KanbanBoard {
        const columnIds = this.columnIds().filter(id => !id.equals(columnId));
        return this.merge({ columnIds }) as KanbanBoard;
    }

    public updateName(name: string): KanbanBoard {
        return this.merge({ name }) as KanbanBoard;
    }

    public startEditing(): KanbanBoard {
        return this.merge({ editing: true }) as KanbanBoard;
    }

    public endEditing(): KanbanBoard {
        return this.merge({ editing: false }) as KanbanBoard;
    }
}
