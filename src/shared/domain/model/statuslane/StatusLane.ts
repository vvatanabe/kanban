import { List } from "immutable";
import { CardId, Entity, EntityConstructor, StatusLaneId } from "../";

export interface StatusLaneConstructor extends EntityConstructor<ColumnId> {
    readonly cardIds: List<CardId>;
}

const defaultValues: StatusLaneConstructor = {
    id: new StatusLaneId(),
    editing: false,
    name: "",
    cardIds: List.of(),
};

export class StatusLane extends Entity<StatusLaneId>(defaultValues) {

    get cardIds(): List<CardId> { return this.get("cardIds"); }
    get hasCard(): boolean { return !this.cardIds.isEmpty; }

    constructor(params: StatusLaneConstructor) {
        super(params);
    }

    public attachCard(cardId: CardId): StatusLane {
        return this.merge({ cardIds: this.cardIds.push(cardId) }) as StatusLane;
    }
    public detachCard(cardId: CardId): StatusLane {
        return this.merge({ cardIds: this.cardIds.filter(id => !id.equals(cardId)) }) as StatusLane;
    }
    public moveCard(srcId: CardId, distId: CardId): StatusLane {
        const srcIndex = this.cardIds.findIndex(id => id.equals(srcId));
        const distIndex = this.cardIds.findIndex(id => id.equals(distId));
        const cardIds = this.cardIds.delete(srcIndex).insert(distIndex, srcId);
        return this.merge({ cardIds }) as StatusLane;
    }

    public hasCardOf(id: CardId): boolean {
        return this.cardIds.some(cardId => cardId.equals(id));
    }

    public equals(obj: any): boolean {
        return obj instanceof StatusLane && obj.id.equals(this.id);
    }

    public toJS(): any {
        const obj = super.toJS();
        return {
            ...obj,
            ...{
                id: obj.id.value,
                cardIds: obj.cardIds.map(cardId => cardId.value),
            },
        };
    }
}

export namespace StatusLane {
    export const fromJs = (obj: any): StatusLane => new StatusLane({
        ...obj,
        ...{
            id: new StatusLaneId(obj.id),
            cardIds: List.of<CardId>(obj.cardIds.map(id => new CardId(id))),
        },
    });
    export const create = (): StatusLane => new StatusLane({
        ...defaultValues,
    });
}