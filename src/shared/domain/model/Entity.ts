import { Record } from "immutable";
import { Identifier } from "./Identifier";

export interface EntityConstructor<ID extends Identifier<any>> {
    readonly id: ID;
    readonly editing: boolean;
    readonly [key: string]: any;
}

export const Entity = <ID extends Identifier<any>>(defaultValues: EntityConstructor<ID>) => {
    abstract class EntityClass extends Record({ ...defaultValues }) {

        get id(): ID { return this.get("id"); }
        get editing(): boolean { return this.get("editing"); }

        constructor(params: EntityConstructor<ID>) {
            super(params);
        }

        public startEditing(): this {
            return this.merge({ editing: true }) as this;
        }
        public endEditing(): this {
            return this.merge({ editing: false }) as this;
        }

        public abstract equals(obj: any): boolean;

    }
    return EntityClass;
};
