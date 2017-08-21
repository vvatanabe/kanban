import { injectable } from "inversify";
import { Card, CardId, CardRepository, ColumnId } from "../../domain/model/";
import { addCard, deleteCard, deleteCards, updateCard } from "./redux/card";
import { dispatch, getState } from "./redux/ReduxStore";

@injectable()
export default class CardRepositoryOnReduxStore extends CardRepository {

    public add(card: Card) {
        dispatch(addCard(card));
    }

    public update(card: Card) {
        dispatch(updateCard(card));
    }

    public delete(cardId: CardId) {
        dispatch(deleteCard(cardId));
    }

    public deleteByColumnId(columnId: ColumnId) {
        const column = getState().columns.find(c => c.id.equals(columnId));
        dispatch(deleteCards(column.cardIds));
    }

}
