import * as uuid from 'uuid';
import Action from './action';
import ActionType from '../constants/actionType';
import { Card } from '../models';

export const createCard = (summary: string): Action<Card> => ({
    type: ActionType.CreateCard,
    payload: {
        id: uuid.v4(),
        summary,
        estimatedHours: 0,
        actualHours: 0,
        editing: false
    } as Card
});

export const editCard = (id: string): Action<Card> => ({
    type: ActionType.EditCard,
    payload: {
      id,
      editing: true
    } as Card
});

export const updateCard = (updatedCard: Card): Action<Card> => ({
    type: ActionType.UpdateCard,
    payload: updatedCard
});

export const deleteCard = (id: string): Action<Card> => ({
    type: ActionType.DeleteCard,
    payload: {
        id,
        editing: false
    } as Card
});
