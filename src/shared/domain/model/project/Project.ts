import { List } from "immutable";
import { BoardId, Entity, EntityConstructor, ProjectId } from "../";

export interface ProjectConstructor extends EntityConstructor<ProjectId> {
    readonly boardIds: List<BoardId>;
}

const defaultValues: ProjectConstructor = {
    id: new ProjectId(),
    boardIds: List.of(),
};

export class Project extends Entity<ProjectId>(defaultValues) {
    constructor(params: ProjectConstructor) {
        super(params);
    }

    get boardIds(): List<ProjectId> { return this.get("boardIds"); }

    public equals(obj: any): boolean {
        return obj instanceof Project && obj.id.equals(this.id);
    }

    public toPlaneObject(): { [key: string]: any } {
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
}
