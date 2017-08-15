import { Entity, EntityConstructor, StatusId } from "../";

export interface StatusConstructor extends EntityConstructor<StatusId> {
    readonly name: string;
}

const defaultValues: StatusConstructor = {
    id: new StatusId(),
    name: "",
};

export class Status extends Entity<StatusId>(defaultValues) {

    constructor(params: StatusConstructor) {
        super(params);
    }

    public equals(obj: any): boolean {
        return obj instanceof Status && this.id.equals(obj.id);
    }

    public toPlaneObject(): { [key: string]: any; } {
        throw new Error("Method not implemented.");
    }
}

export namespace Status {

    export function fromJs(obj: any): Status {
        return new Status({
            ...obj,
            ...{
                id: new StatusId(obj.id),
            },
        });
    }

    export function create(name: string): Status {
        return new Status({ ...defaultValues, ...{ name } });
    }

}
