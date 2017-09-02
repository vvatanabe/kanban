import { injectable } from "inversify";
import { CardId, StatusLane, StatusLaneId } from "../";

@injectable()
export abstract class ColumnRepository {
    public abstract add(statusLane: StatusLane);
    public abstract update(statusLane: StatusLane);
    public abstract delete(id: StatusLaneId);
    public abstract find(id: StatusLaneId): StatusLane;
}