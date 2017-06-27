import ActionType from '../constants/actionType';
import Action from './action';
import { StoryLane, Card, StoryLaneOperation, StoryLaneMovePosition, CardMovePosition } from '../models';
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


export const create = (cardId: string, statusLaneIds: string[]): Action<StoryLane> => ({
    type: ActionType.CreateStoryLane,
    payload: {
        id: uuid.v4(),
        cardId: cardId,
        statusLaneIds: statusLaneIds,
        editing: false
    }
});

export const update = (storyLane: StoryLane): Action<StoryLane> => ({
    type: ActionType.UpdateStoryLane,
    payload: storyLane
});

export const remove = (storyLaneId: string): Action<string> => ({
    type: ActionType.DeleteStoryLane,
    payload: storyLaneId
});

export const moveStoryLane = (bordId: string, sourceLaneId: string, targetLaneId: string): Action<StoryLaneMovePosition> => ({
    type: ActionType.MoveStoryLane,
    payload: {
        bordId,
        sourceLaneId,
        targetLaneId
    }
});

export const moveCard = (listId: string, sourceCardId: string, targetCardId: string): Action<CardMovePosition> => ({
    type: ActionType.MoveCard,
    payload: {
        listId,
        sourceCardId,
        targetCardId
    }
});