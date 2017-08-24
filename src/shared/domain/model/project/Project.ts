import { List } from "immutable";
import { BoardId, Entity, EntityConstructor, ProjectId } from "../";

export interface ProjectConstructor extends EntityConstructor<ProjectId> {
    readonly name: String;
    readonly boardIds: List<BoardId>;
    readonly archived: boolean;
}

const defaultValues: ProjectConstructor = {
    id: new ProjectId(),
    name: "",
    editing: false,
    boardIds: List.of(),
    archived: false,
};

export class Project extends Entity<ProjectId>(defaultValues) {

    get name(): string { return this.get("name"); }
    get boardIds(): List<ProjectId> { return this.get("boardIds"); }
    get archived(): boolean { return this.get("archived"); }

    constructor(params: ProjectConstructor) {
        super(params);
    }

    public updateName(name: string): Project {
        return this.merge({ name }) as Project;
    }

    public archiving(): Project {
        return this.merge({ archived: true }) as Project;
    }

    public equals(obj: any): boolean {
        return obj instanceof Project && obj.id.equals(this.id);
    }

    public toJs(): { [key: string]: any } {
        const obj = super.toJS();
        return {
            ...obj,
            ...{
                id: obj.id.value,
                boardIds: obj.boardIds.map(boardId => boardId.value),
            },
        };
    }

}

export namespace Project {
    export const fromJs = (obj: any): Project => new Project({
        ...obj,
        ...{
            id: new ProjectId(obj.id),
            boardIds: List(obj.boardIds.map(boardId => new BoardId(boardId))),
        },
    });
    export const create = (name: string): Project => new Project({
        ...defaultValues,
        ...{ name },
    });
}
