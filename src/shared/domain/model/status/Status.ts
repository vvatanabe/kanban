import { Entity } from "./Entity";
import { StatusId } from "./StatusId";

export class Status implements Entity<StatusId> {

    constructor(
        readonly id: StatusId,
        readonly name: string,
    ) { }

    public equals(obj: any): boolean {
        return obj instanceof Status && obj.id.equals(this.id)
    }

    public copy(params: {
        id?: Status,
        name?: string,
    }): Status {
        return Object.assign({}, this, params)
    }

}

export namespace Status {

    export function fromJs(obj: any): Status {
        return Status.create(Object.assign({}, obj, {
            id: Status.create(obj.id)
        }));
    }

    export function create({
        id = undefined,
        name = ""
    }: {
            id?: StatusId;
            name?: string;
        }): Status {
        return new Status(id, name);
    }

}

import { Status, StatusId } from '../models';

const DEFAULT_STATUSES: Status[] = [
    {
        id: StatusId.create("097c42e1-d15f-4edf-a098-21ea10f1ab14"),
        name: "Open",
    },
    {
        id: StatusId.create("fff8d375-5600-4ecc-9dfc-ff59e656a458"),
        name: "In Progress",
    },
    {
        id: StatusId.create("38feef6e-b11c-4a77-b323-1a1aa941be97"),
        name: "Resolved",
    },
    {
        id: StatusId.create("b167ab43-a641-4937-aa60-ecabfe348b43"),
        name: "Closed",
    }
]

export default DEFAULT_STATUSES;