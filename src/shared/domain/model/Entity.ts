import { Record } from "immutable";
import { Identifier } from "./";

export const Entity = <ID extends Identifier<any>>(defaultValues: any = {}) => {

    return class extends Record(defaultValues) {
        get id(): ID { return this.get("id"); }
        public copy(values: { [key: string]: any }): this {
            return this.merge(values) as this;
        }
    };
};
