import { List } from "immutable";
import { Card, CardId } from "../../../../domain/model";
import Action from "../Action";
import { createReducer } from "../createReducer";

export enum CardActionType {
    AddCard = "ADD_CARD",
    UpdateCard = "UPDATE_CARD",
    DeleteCards = "DELETE_CARDS",
}

interface AddCardAction extends Action<Card> { }

interface UpdateCardAction extends Action<Card> { }

interface DeleteCardsAction extends Action<List<CardId>> { }

export class CardActionCreator {

    public static add = (card: Card): Action<Card> => ({
        type: CardActionType.AddCard,
        payload: card,
    })

    public static update = (card: Card): Action<Card> => ({
        type: CardActionType.UpdateCard,
        payload: card,
    })

    public static delete = (cardIds: List<CardId>): DeleteCardsAction => ({
        type: CardActionType.DeleteCards,
        payload: cardIds,
    })

}

class CardReducer {

    public static add(cards: List<Card>, action: AddCardAction): List<Card> {
        return cards.push(action.payload);
    }

    public static update(cards: List<Card>, action: UpdateCardAction): List<Card> {
        const index = cards.findIndex(card => card.equals(action.payload));
        return cards.set(index, action.payload);
    }

    public static delete(cards: List<Card>, action: DeleteCardsAction) {
        return cards.filter(card => !action.payload.find(cardId => cardId.equals(card.id))).toList();
    }

}

const cardReducer = createReducer<List<Card>>(List.of(), {
    [CardActionType.AddCard]: CardReducer.add,
    [CardActionType.UpdateCard]: CardReducer.update,
    [CardActionType.DeleteCards]: CardReducer.delete,
});

export default cardReducer;
