import { List } from "immutable";
import { CardModal, ColumnId, Entity, ScrumBoardId, StatusId, Undefined, UserStoryId } from "../";

interface ScrumBoardConstructor {
    id?: ScrumBoardId;
    name?: string;
    userStoryIds?: List<UserStoryId>;
    statusIds?: List<StatusId>;
    editing?: boolean;
    cardModal?: CardModal;
}

export class ScrumBoard extends Entity<ScrumBoardId>({
    id: new Undefined(),
    name: "New Board",
    userStoryIds: List.of(),
    statusIds: List.of(),
    editing: false,
    cardModal: undefined,
}) {
    constructor(params: ScrumBoardConstructor) {
        super(params);
    }

    get name(): string { return this.get("name"); }
    get userStoryIds(): List<UserStoryId> { return this.get("userStoryIds"); }
    get statusIds(): List<StatusId> { return this.get("statusIds"); }
    get editing(): boolean { return this.get("editing"); }
    get cardModal(): CardModal { return this.get("cardModal"); }
    get hasCardModal(): boolean { return this.has("cardModal"); }

    public equals(obj: any): boolean {
        return obj instanceof ScrumBoard && obj.id.equals(this.id);
    }

    public updateName(name: string): this {
        return this.copy({ name });
    }

    public addUserStory(userStoryId: UserStoryId): this {
        return this.copy({ userStoryIds: this.userStoryIds.push(userStoryId) });
    }

    public removeUserStory(userStoryId: UserStoryId): this {
        return this.copy({ userStoryIds: this.userStoryIds.filter(id => !id.equals(userStoryId)) });
    }

    public startEditing(): this {
        return this.copy({ editing: true });
    }

    public endEditing(): this {
        return this.copy({ editing: false });
    }

}

export namespace ScrumBoard {
    export const fromJs = (obj: any): ScrumBoard => new ScrumBoard({
        ...obj,
        ...{
            id: new ScrumBoardId(obj.id),
            statusIds: List.of(obj.statusIds.map(id => new StatusId(id))),
            userStoryIds: List.of(obj.userStoryIds.map(id => new UserStoryId(id))),
        },
    });
}
