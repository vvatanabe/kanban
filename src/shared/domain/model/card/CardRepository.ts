import { injectable } from "inversify";
import { Card, CardId, ColumnId } from "../";

@injectable()
export abstract class CardRepository {
    public abstract add(card: Card);
    public abstract update(card: Card);
    public abstract delete(cardId: CardId);
    public abstract deleteByColumnId(columnId: ColumnId);
}
