import { injectable } from "inversify";
import { CardId, Column, ColumnId } from "../";

@injectable()
export abstract class ColumnRepository {
    public abstract add(column: Column);
    public abstract update(column: Column);
    public abstract delete(id: ColumnId);
    public abstract find(id: ColumnId): Column;
    public abstract findByCardId(id: CardId): Column;
}
