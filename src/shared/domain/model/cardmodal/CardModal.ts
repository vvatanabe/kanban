import { Record } from "immutable";
import { CardId, Undefined } from "../";

interface CarModalConstructor {
    cardId: CardId;
    isEditingSummary: boolean;
    isEditingDescription: boolean;
    isEditingStartDate: boolean;
    isEditingDueDate: boolean;
    isEditingEstimatedHours: boolean;
    isEditingActualHours: boolean;
    isEditingPoint: boolean;
}

export class CardModal extends Record({
    cardId: new Undefined(),
    isEditingSummary: false,
    isEditingDescription: false,
    isEditingStartDate: false,
    isEditingDueDate: false,
    isEditingEstimatedHours: false,
    isEditingActualHours: false,
    isEditingPoint: false,
}) {
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
