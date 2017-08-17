import { List } from "immutable";
import { Card, CardId } from "../../../../domain/model";
import Action from "../Action";
import { createReducer } from "../createReducer";

const ADD_CARD = "ADD_CARD";
const UPDATE_CARD = "UPDATE_CARD";
const DELETE_CARDS = "DELETE_CARDS";

export default createReducer<List<Card>>(List.of(), {
    [ADD_CARD]: (cards: List<Card>, action: AddCardAction): List<Card> => {
        return cards.push(action.payload);
    },
    [UPDATE_CARD]: (cards: List<Card>, action: UpdateCardAction): List<Card> => {
        const index = cards.findIndex(card => card.equals(action.payload));
        return cards.set(index, action.payload);
    },
    [DELETE_CARDS]: (cards: List<Card>, action: DeleteCardsAction): List<Card> => {
        return cards.filter(card => !action.payload.find(cardId => cardId.equals(card.id))).toList();
    },
});

type AddCardAction = Action<Card>;
type UpdateCardAction = Action<Card>;
type DeleteCardsAction = Action<List<CardId>>;

export const addCard = (card: Card): AddCardAction => ({
    type: ADD_CARD,
    payload: card,
});
export const updateCard = (card: Card): UpdateCardAction => ({
    type: UPDATE_CARD,
    payload: card,
});
export const deleteCards = (cardIds: List<CardId>): DeleteCardsAction => ({
    type: DELETE_CARDS,
    payload: cardIds,
});
