import { Record } from "immutable";
import { Identifier } from "./Identifier";
import { Undefined } from "./Undefined";

export const Entity = <ID extends Identifier<any>>(defaultValues: any) => class extends Record(defaultValues) {
    get id(): ID { return this.get("id"); }
    public copy(values: { [key: string]: any }): this {
        return this.merge(values) as this;
    }
};
