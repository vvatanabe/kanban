import { ColumnCard } from "./ColumnCard";

export interface MoveColumnCardCommand {
    src: ColumnCard;
    dist: ColumnCard;
}
