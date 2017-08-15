import { CardId, Entity, EntityConstructor } from "../";

export interface CardConstructor extends EntityConstructor<CardId> {
    readonly summary: string;
    readonly description: string;
    readonly startDate: string;
    readonly dueDate: string;
    readonly estimatedHours: number;
    readonly actualHours: number;
    readonly point: number;
    readonly editing: boolean;
}

const defaulValues: CardConstructor = {
    id: new CardId(),
    summary: "",
    description: "",
    startDate: "",
    dueDate: "",
    estimatedHours: 0,
    actualHours: 0,
    point: 0,
    editing: false,
};

export class Card extends Entity<CardId>(defaulValues) {
    constructor(params: CardConstructor) {
        super(params);
    }

    get summary(): string { return this.get("summary"); }
    get description(): string { return this.get("description"); }
    get startDate(): string { return this.get("startDate"); }
    get dueDate(): string { return this.get("dueDate"); }
    get estimatedHours(): number { return this.get("estimatedHours"); }
    get actualHours(): number { return this.get("actualHours"); }
    get point(): number { return this.get("point"); }
    get editing(): boolean { return this.get("editing"); }

    public equals(obj: any): boolean {
        return obj instanceof Card && obj.id.equals(this.id);
    }

    public toJS(): any {
        const obj = super.toJS();
        return {
            ...obj,
            ...{
                id: obj.id.value,
            },
        };
    }
}

export namespace Card {
    export const fromJs = (obj: any): Card => new Card({
        ...obj,
        ...{
            id: new CardId(obj.id),
        },
    });
    export const create = (params: {
        summary?: string;
        description?: string;
        startDate?: string;
        dueDate?: string;
        estimatedHours?: number;
        actualHours?: number;
        point?: number;
    }): Card => new Card({
        ...defaulValues,
        ...params,
    });
}
