import { Identifier } from "./Identifier";

export class UserStoryId implements Identifier<string> {
    constructor(
        readonly value: string,
        readonly isUndefined: boolean = false,
    ) { }
    public equals(obj: any): boolean {
        return obj instanceof UserStoryId && obj.value === this.value;
    }
}

export namespace UserStoryId {
    export function create(value: string): UserStoryId {
        return new UserStoryId(value);
    }
}
