import { List, Map, Record } from "immutable";
import { BoardId, BoardType, CardModal, ColumnId, Entity, EntityConstructor } from "../";

export interface BoardConstructor extends EntityConstructor<BoardId> {
    readonly type: BoardType;
    readonly name: string;
    readonly cardModal: CardModal;
    readonly editing: boolean;
}

const defaulValues: BoardConstructor = {
    id: undefined,
    type: undefined,
    name: "",
    cardModal: undefined,
    editing: false,
};

export const Board = (values: BoardConstructor) => {
    abstract class BoardClass extends Entity<BoardId>({ ...defaulValues, ...values }) {

        constructor(params: BoardConstructor) {
            super(params);
        }

        get name(): string { return this.get("name"); }
        get type(): string { return this.get("type"); }
        get cardModal(): CardModal { return this.get("cardModal"); }
        get editing(): boolean { return this.get("editing"); }
        get shouldBeOpenCardModal(): boolean { return this.cardModal.hasCardId; }

        public updateName(name: string): this {
            return this.merge({ name }) as this;
        }

        public startEditing(): this {
            return this.copy({ editing: true }) as this;
        }

        public endEditing(): this {
            return this.copy({ editing: false }) as this;
        }

    }
    return BoardClass;
};
