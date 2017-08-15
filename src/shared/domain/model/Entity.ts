import { Record } from "immutable";
import { Identifier } from "./Identifier";

export interface EntityConstructor<ID extends Identifier<any>> {
    readonly id: ID;
    readonly [key: string]: any;
}

export const Entity = <ID extends Identifier<any>>(defaultValues: EntityConstructor<ID>) => {
    abstract class EntityClass extends Record({ ...defaultValues }) {

        constructor(params: EntityConstructor<ID>) {
            super(params);
        }

        get id(): ID { return this.get("id"); }

        public abstract equals(obj: any): boolean;

        public abstract toPlaneObject(): { [key: string]: any };

    }
    return EntityClass;
};
