import { injectable } from "inversify";
import { Card, CardId, CardRepository, ColumnId } from "../../domain/model/";
import { CardActionCreator } from "./redux/card";
import { dispatch, getState } from "./redux/ReduxStore";

@injectable()
export default class CardRepositoryOnReduxStore extends CardRepository {

    public add(card: Card) {
        dispatch(CardActionCreator.add(card));
    }

    public update(card: Card) {
        dispatch(CardActionCreator.update(card));
    }

    public delete(cardId: CardId) {
        dispatch(CardActionCreator.delete(cardId));
    }

    public deleteCardsInColumn(columnId: ColumnId) {
        const cardIds = getState().columns.find(column => column.id.equals(columnId)).cardIds;
        dispatch(CardActionCreator.deleteCards(cardIds));
    }

}
