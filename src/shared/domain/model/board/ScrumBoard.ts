import { List } from "immutable";
import { Board, BoardConstructor, BoardId, BoardType, CardModal, StatusId, UserStoryId } from "../";

interface ScrumBoardConstructor extends BoardConstructor {
    readonly userStoryIds: List<UserStoryId>;
    readonly statusIds: List<StatusId>;
}

const defaultValues: ScrumBoardConstructor = {
    id: new BoardId(),
    type: BoardType.KanbanBoard,
    name: "",
    cardModal: CardModal.create({}),
    editing: false,
    userStoryIds: List.of(),
    statusIds: List.of(),
};

export class ScrumBoard extends Board(defaultValues) {

    constructor(params: ScrumBoardConstructor) {
        super(params);
    }

    get userStoryIds(): List<UserStoryId> { return this.get("userStoryIds"); }
    get statusIds(): List<StatusId> { return this.get("statusIds"); }

    public addUserStory(userStoryId: UserStoryId): ScrumBoard {
        return this.merge({
            userStoryIds: this.userStoryIds.push(userStoryId),
        }) as ScrumBoard;
    }

    public removeUserStory(userStoryId: UserStoryId): ScrumBoard {
        return this.merge({
            userStoryIds: this.userStoryIds.filter(id => !id.equals(userStoryId)),
        }) as ScrumBoard;
    }

    public equals(obj: any): boolean {
        return obj instanceof ScrumBoard && this.id.equals(obj.id);
    }

    public toPlaneObject(): { [key: string]: any } {
        const obj = this.toJS();
        return {
            ...obj,
            ...{
                id: this.id.value,
                userStoryIds: this.userStoryIds.map(id => id.value),
                statusIds: this.statusIds.map(id => id.value),
            },
        };
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
    export const create = (name: string): ScrumBoard => new ScrumBoard({ ...defaultValues, ...{ name } });
}
