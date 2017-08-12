import { List } from "immutable";
import { BoardId, BoardType, CardModal, Entity } from "../";

interface BoardConstructor {
    readonly id?: BoardId;
    readonly type?: BoardType;
    readonly name?: string;
    readonly cardModal?: CardModal;
    readonly editing?: boolean;
    readonly kanbanBoard?: {
        readonly columnIds?: List<ColumnId>;
    };
    readonly scrumBoard?: {
        readonly userStoryIds?: List<UserStoryId>;
        readonly statusIds?: List<StatusId>;
    };
}

const defaulValues: BoardConstructor = {
    id: undefined,
    type: undefined,
    name: "",
    cardModal: undefined,
    editing: false,
};

export class Board extends Entity<BoardId>(defaulValues) {

    get name(): string { return this.get("name"); }
    get type(): string { return this.get("type"); }
    get cardModal(): CardModal { return this.get("cardModal"); }
    get editing(): boolean { return this.get("editing"); }



    get shouldBeOpenCardModal(): boolean { return this.cardModal.hasCardId; }

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
