import { List } from "immutable";
import * as uuid from "uuid";
import ActionType from "../constants/ActionType";
import { Action, Card, CardId } from "../models";

interface DeleteCardsAction extends Action<List<CardId>> { }

export const createCard = (): Action<{}> => ({
    type: ActionType.CreateCard,
    payload: {},
});

export const updateCard = (card: Card): Action<Card> => ({
    type: ActionType.UpdateCard,
    payload: card,
});

export const deleteCards = (cardId: List<CardId>): DeleteCardsAction => ({
    type: ActionType.DeleteCards,
    payload: cardId,
});

import { List } from "immutable";
import * as uuid from "uuid";
import ActionType from "../constants/ActionType";
import { Action, Card, CardId } from "../models";
import { createReducer } from "./createReducer";

const createCard = (state: List<Card>, action: Action<{}>): List<Card> => {
    const card = Card.create({
        id: CardId.create(uuid.v4()),
    });
    return state.push(card);
};

const deleteCard = (state: List<Card>, action: Action<CardId>): List<Card> => (
    state.filter(card => !card.id.equals(action.payload)).toList()
);

const updateCard = (state: List<Card>, action: Action<Card>): List<Card> => (
    state.map(card => card.equals(action.payload) ? card.copy(action.payload) : card).toList()
);

const cards = createReducer<List<Card>>(List.of(), {
    [ActionType.CreateCard]: createCard,
    [ActionType.UpdateCard]: updateCard,
    [ActionType.DeleteCard]: deleteCard,
});

export default cards;
