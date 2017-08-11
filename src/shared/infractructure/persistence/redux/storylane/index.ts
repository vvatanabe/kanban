import ActionType from '../constants/ActionType';
import { Action, BoardId, StoryLane, StoryLaneId, Card, CardId, StoryLaneMovePosition, CardMovePosition } from '../models';
import DnDItemType from '../constants/DnDItemType';
import * as uuid from 'uuid';

export const create = (cardId: CardId, statusLaneIds?: StoryLaneId[]): Action<StoryLane> => ({
    type: ActionType.CreateStoryLane,
    payload: StoryLane.create({
        id: StoryLaneId.create(uuid.v4()),
        cardId,
        statusLaneIds: !!statusLaneIds ? statusLaneIds : []
    })
});

export const deletes = (storyLaneIds: StoryLaneId[]): Action<StoryLaneId[]> => ({
    type: ActionType.DeleteStoryLanes,
    payload: storyLaneIds
});

export const move = (boardId: BoardId, fromLaneId: StoryLaneId, toLaneId: StoryLaneId): Action<[BoardId, StoryLaneId, StoryLaneId]> => ({
    type: ActionType.MoveStoryLane,
    payload: [boardId, fromLaneId, toLaneId]
});

export const attachToBoard = (laneId: StoryLaneId, boardId: BoardId): Action<[StoryLaneId, BoardId]> => ({
    type: ActionType.AttachStoryLaneToBoard,
    payload: [laneId, boardId]
});

export const detachFromScrumBoard = (boardId: BoardId, laneId: StoryLaneId): Action<[BoardId, StoryLaneId]> => ({
    type: ActionType.DetachStoryLaneFromScrumBoard,
    payload: [boardId, laneId]
});




export const updateStoryLaneName = (storyLaneId: string, storyLaneName: string): Action<{ storyLaneId: string, storyLaneName: string }> => ({
    type: ActionType.UpdateStoryLane,
    payload: {
        storyLaneId,
        storyLaneName
    }
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

import ActionType from '../constants/actionType';
import Action from '../actions/action';
import * as uuid from 'uuid';
import { StoryLane, Card, StoryLaneOperation, StoryLaneMovePosition, CardMovePosition } from '../models';
import { createReducer } from './createReducer';
import reactAddonsUpdate = require('react-addons-update');

const defaultState: StoryLane[] = [];

const create = (state: StoryLane[], action: Action<StoryLane>): StoryLane[] => state.concat(action.payload)

const updateStoryLane = (state: StoryLane[], action: Action<StoryLane>): StoryLane[] => {
    return state.map(storyLane => {
        return storyLane.id === action.payload.id ? Object.assign({}, storyLane, {
            name: action.payload.
    }) : storyLane
    });
}

const remove = (state: StoryLane[], action: Action<StoryLane>): StoryLane[] => (
    state.filter(storyLane => storyLane.id !== action.payload.id)
)

const attachToStoryLane = (state: StoryLane[], action: Action<StoryLaneOperation>): StoryLane[] => {
    const { storyLaneId, cardId } = action.payload;

    return state.map(lane => {
        if (!!~list.cardIds.indexOf(cardId)) {
            // 移動するカードを元の位置から排除する
            return Object.assign({}, list, {
                cardIds: list.cardIds.filter(id => id !== cardId),
            });
        }
        if (list.id === listId) {
            // 移動するカードを指定の位置へ移動する
            return Object.assign({}, list, {
                cardIds: list.cardIds.concat(cardId),
            });
        }
        return list;
    });
}

const detachFromList = (state: List[], action: Action<Operator>): List[] => {
    const { listId, cardId } = action.payload;
    return state.map(list => {
        if (list.id === listId) {
            return Object.assign({}, list, {
                cardIds: list.cardIds.filter(id => id !== cardId),
            });
        }
        return list;
    });
}

const moveCard = (state: List[], action: Action<CardMovePosition>): List[] => {
    const { listId, sourceCardId, targetCardId } = action.payload;
    const sourceList = state.filter(list => !!~list.cardIds.indexOf(sourceCardId))[0];
    const targetList = state.filter(list => !!~list.cardIds.indexOf(targetCardId))[0];

    const sourceCardIndex = sourceList.cardIds.reduce((result, cardId, index) => {
        if (cardId === sourceCardId) {
            result = index;
        }
        return result;
    }, -1);
    const targetCardIndex = targetList.cardIds.reduce((result, cardId, index) => {
        if (cardId === targetCardId) {
            result = index;
        }
        return result;
    }, -1);
    if (sourceList.id === targetList.id) {
        // カードの移動先が <同じリスト> の場合
        return state.map(list => {
            if (list.id === sourceList.id) {
                const movedList: List = Object.assign({}, list, {
                    cardIds: update(sourceList.cardIds, {
                        $splice: [
                            [sourceCardIndex, 1], // 対象を <元の位置> から <削除>
                            [targetCardIndex, 0, sourceCardId],  // 対象を <移動先の位置> へ <追加>
                        ]
                    })
                });
                return movedList;
            } else {
                return list;
            }
        });
    }
    // カードの移動先が <別のリスト> の場合
    return state.map((list: List) => {
        if (list.id === sourceList.id) {
            // 対象を <元の位置> から <削除>
            const removedList: List = Object.assign({}, list, {
                cardIds: update(list.cardIds, {
                    $splice: [[sourceCardIndex, 1]]
                })
            });
            return removedList;
        } else if (list.id === targetList.id) {
            // 対象を <移動先の位置> へ <追加>
            const addedList: List = Object.assign({}, list, {
                cardIds: update(list.cardIds, {
                    $splice: [[targetCardIndex, 0, sourceCardId]]
                })
            });
            return addedList;
        }
        return list;
    });
}

export const lists = createReducer<List[], any>(defaultState, {
    [ActionType.CreateList]: createList,
    [ActionType.UpdateList]: updateList,
    [ActionType.DeleteList]: deleteList,
    [ActionType.AttachToList]: attachToList,
    [ActionType.DetachFromList]: detachFromList,
    [ActionType.MoveCard]: moveCard
});

// export const operaters = createReducer<List, Operator>(defaultState, {
//
// });
//
// export const movers = createReducer<List, Mover>(defaultState, {
//
// });
