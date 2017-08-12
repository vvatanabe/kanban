import { List } from "immutable";
import { Board, BoardId, CardModal, ColumnId, StatusId, UserStoryId } from "../";

interface ScrumBoardConstructor {
    readonly id?: BoardId;
    readonly name?: string;
    readonly cardModal?: CardModal;
    readonly editing?: boolean;
    readonly userStoryIds?: List<UserStoryId>;
    readonly statusIds?: List<StatusId>;
}

const defaulValues: ScrumBoardConstructor = {
    id: new BoardId(),
    name: "New Board",
    cardModal: CardModal.create({}),
    editing: false,
    userStoryIds: List.of(),
    statusIds: List.of(),
};

export class ScrumBoard extends Board(defaulValues) {

    constructor(params: ScrumBoardConstructor) {
        super(params);
    }

    get userStoryIds(): List<UserStoryId> { return this.get("userStoryIds"); }
    get statusIds(): List<StatusId> { return this.get("statusIds"); }

    public equals(obj: any): boolean {
        return obj instanceof ScrumBoard && obj.id.equals(this.id);
    }

    public addUserStory(userStoryId: UserStoryId): this {
        return this.copy({ userStoryIds: this.userStoryIds.push(userStoryId) });
    }

    public removeUserStory(userStoryId: UserStoryId): this {
        return this.copy({ userStoryIds: this.userStoryIds.filter(id => !id.equals(userStoryId)) });
    }

}

export namespace ScrumBoard {
    export const fromJs = (obj: any): ScrumBoard => new ScrumBoard({
        ...obj,
        ...{
            id: new BoardId(obj.id),
            statusIds: List.of(obj.statusIds.map(statusId => new StatusId(statusId))),
            userStoryIds: List.of(obj.userStoryIds.map(userStoryId => new UserStoryId(userStoryId))),
        },
    });
    export const create = (params: {
        name?: string;
        userStoryIds?: List<UserStoryId>;
        statusIds?: List<StatusId>;
    }): ScrumBoard => new ScrumBoard(params);
}
