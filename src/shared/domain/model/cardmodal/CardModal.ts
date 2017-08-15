import { Record } from "immutable";
import { CardId } from "../";

interface CarModalConstructor {
    readonly cardId: CardId;
    readonly isEditingSummary: boolean;
    readonly isEditingDescription: boolean;
    readonly isEditingStartDate: boolean;
    readonly isEditingDueDate: boolean;
    readonly isEditingEstimatedHours: boolean;
    readonly isEditingActualHours: boolean;
    readonly isEditingPoint: boolean;
}

const defaultValues: CarModalConstructor = {
    cardId: undefined,
    isEditingSummary: false,
    isEditingDescription: false,
    isEditingStartDate: false,
    isEditingDueDate: false,
    isEditingEstimatedHours: false,
    isEditingActualHours: false,
    isEditingPoint: false,
};

export class CardModal extends Record(defaultValues) {

    constructor(params: CarModalConstructor) {
        super(params);
    }

    get cardId(): CardId { return this.get("cardId"); }
    get isEditingSummary(): boolean { return this.get("isEditingSummary"); }
    get isEditingDescription(): boolean { return this.get("isEditingDescription"); }
    get isEditingStartDate(): boolean { return this.get("isEditingStartDate"); }
    get isEditingDueDate(): boolean { return this.get("isEditingDueDate"); }
    get isEditingEstimatedHours(): boolean { return this.get("isEditingEstimatedHours"); }
    get isEditingActualHours(): boolean { return this.get("isEditingActualHours"); }
    get isEditingPoint(): boolean { return this.get("isEditingPoint"); }

    get hasCardId(): boolean { return !this.cardId.isUndefined; }

    public open(cardId: CardId): CardModal {
        return this.copy({ cardId });
    }

    public close(): CardModal {
        return this.hideFormOfAll().erase("cardId");
    }

    public showFormOfSummary(): CardModal {
        return this.copy({ isEditingSummary: true });
    }

    public showFormOfDescription(): CardModal {
        return this.copy({ isEditingDescription: true });
    }

    public showFormOfStartDate(): CardModal {
        return this.copy({ isEditingStartDate: true });
    }

    public showFormOfDueDate(): CardModal {
        return this.copy({ isEditingDueDate: true });
    }

    public showFormOfEstimatedHours(): CardModal {
        return this.copy({ isEditingEstimatedHours: true });
    }

    public showFormOfActualHours(): CardModal {
        return this.copy({ isEditingActualHours: true });
    }

    public showFormOfPoint(): CardModal {
        return this.copy({ isEditingPoint: true });
    }

    public hideFormOfAll(): CardModal {
        return this.copy({
            isEditingSummary: false,
            isEditingDescription: false,
            isEditingStartDate: false,
            isEditingDueDate: false,
            isEditingEstimatedHours: false,
            isEditingActualHours: false,
            isEditingPoint: false,
        });
    }

    private copy(values: { [key: string]: any }): CardModal {
        return this.merge(values) as CardModal;
    }

    private erase(key: string): CardModal {
        return this.delete(key) as CardModal;
    }
}

export namespace CardModal {
    export const fromJs = (obj: any): CardModal => new CardModal({
        ...obj,
        ...{
            cardId: !!obj.cardId ? new CardId(obj.cardId) : undefined,
        },
    });
    export const create = (params = {} as CarModalConstructor): CardModal => new CardModal({
        ...defaultValues,
        ...params,
    });
}
