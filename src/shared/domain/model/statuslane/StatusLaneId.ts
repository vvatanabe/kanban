import { Identifier } from "../Identifier";

export default class StatusLaneId implements Identifier<string> {

    public static create(value: string): StatusLaneId {
        return new StatusLaneId(value);
    }

    private constructor(
        readonly value: string,
        readonly isUndefined: boolean = false,
    ) { }

    public equals(obj: any): boolean {
        return obj instanceof StatusLaneId && obj.value === this.value;
    }

}
