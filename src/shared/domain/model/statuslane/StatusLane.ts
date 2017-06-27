import { List } from "immutable";
import { CardId } from "./CardId";
import { Entity } from "./Entity";
import { StatusId } from "./StatusId";
import { StatusLaneId } from "./StatusLaneId";
import { Undefined } from "./Undefined";

export class StatusLane implements Entity<StatusLaneId> {

    public static fromJs(obj: any): StatusLane {
        return StatusLane.create({
            id: StatusLaneId.create(obj.id),
            statusId: StatusId.create(obj.statusId),
            cardIds: List.of(obj.cardIds.map(cardId => CardId.create(cardId))),
        });
    }

    public static create({
        id = new Undefined(),
        statusId = new Undefined(),
        cardIds = List.of(),
    }: { id?: StatusLaneId; statusId?: StatusId; cardIds?: List<CardId>; }): StatusLane {
        return new StatusLane(id, statusId, cardIds);
    }

    constructor(
        readonly id: StatusLaneId,
        readonly statusId: StatusId,
        readonly cardIds: List<CardId>,
    ) { }

    public equals(obj: any): boolean {
        return obj instanceof StatusLane && obj.id.equals(this.id);
    }

    public copy(params: {
        id?: StatusLaneId,
        statusId?: StatusId,
        cardIds?: List<CardId>,
    }): StatusLane {
        return Object.assign({}, this, params);
    }
}
