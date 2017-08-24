import { List } from "immutable";
import { CardId } from "./CardId";
import { Entity } from "./Entity";
import { Identifier } from "./Identifier";
import { StoryLaneId } from "./StoryLaneId";
import { TaskBlockId } from "./TaskBlockId";
import { Undefined } from "./Undefined";

interface Params {
    id?: StoryLaneId;
    summary?: string;
    description?: string;
    point?: number;
    taskBlockIds?: List<TaskBlockId>;
    editing?: boolean;
}

export class UserStory implements Entity<StoryLaneId> {

    public static create({
        id = new Undefined(),
        summary = "",
        description = "",
        point = 0,
        taskBlockIds = List.of(),
        editing = false,
    }: Params): StoryLane {
        return new StoryLane(id, summary, description, point, taskBlockIds, editing);
    }

    constructor(
        readonly id: StoryLaneId,
        readonly summary: string,
        readonly description: string,
        readonly point: number,
        readonly taskBlockIds: List<TaskBlockId>,
        readonly editing: boolean,
    ) { }

    public equals(obj: any): boolean {
        return obj instanceof StoryLane && obj.id.equals(this.id);
    }

    public copy(params: {
        id?: StoryLaneId;
        summary?: string;
        description?: string;
        point?: number;
        taskBlockIds?: List<TaskBlockId>;
        editing?: boolean;
    }): StoryLane {
        return Object.assign({}, this, params);
    }

}