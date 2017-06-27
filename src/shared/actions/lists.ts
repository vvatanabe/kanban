import ActionType from '../constants/actionType';
import Action from './action';
import { List, Operator, Mover, CardMovePosition } from '../models';
import { ItemType, Item } from '../constants/itemType';
import * as uuid from 'uuid';

// export const createStoryLane = (cardId: string): Action<StoryLane> => ({
//     type: ActionType.CreateStoryLane,
//     payload: {
//         id: uuid.v4(),
//         cardId,
//         statusIds: []
//     } as StoryLane
// });

// interface StoryLane {
//     id: string;
//     cardId: string,
//     statusIds: string[]
// }

// interface Status {
//     id: string;
//     name: string;
// }


export const createList = (name: string): Action<List> => ({
    type: ActionType.CreateList,
    payload: {
        id: uuid.v4(),
        name,
        cardIds: [],
        editing: false
    } as List
});

export const updateList = (updateList: List): Action<List> => ({
    type: ActionType.UpdateList,
    payload: updateList
});

export const deleteList = (id: string): Action<List> => ({
    type: ActionType.DeleteList,
    payload: {
        id
    } as List
});

export const attachToList = (listId: string, cardId: string): Action<Operator> => ({
    type: ActionType.AttachToList,
    payload: {
        listId,
        cardId,
    }
});

export const detachFromList = (listId: string, cardId: string): Action<Operator> => ({
    type: ActionType.DetachFromList,
    payload: {
        listId,
        cardId
    }
});

export const move = (target: ItemType, sourceId: string, targetId: string): Action<Mover> => ({
    type: target === Item.Card ? ActionType.MoveCard : ActionType.MoveList,
    payload: {
        sourceId,
        targetId
    }
});

export const moveCard = (listId: string, sourceCardId: string, targetCardId: string): Action<CardMovePosition> => ({
    type: ActionType.MoveCard,
    payload: {
        listId,
        sourceCardId,
        targetCardId
    } as CardMovePosition
});