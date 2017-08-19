import * as uuid from "uuid";
import ActionType from "../constants/ActionType";
import { Action, BoardId, StatusLaneId } from "../models";

interface AddNewStatusLaneToBoardAction extends Action<BoardId> { }

interface DeleteStatusLaneAction extends Action<StatusLaneId> { }

interface DetachStatusLaneFromBoardAction extends Action<{ boardId: BoardId; statusLaneId: StatusLaneId; }> { }

interface MoveStatusLaneAction extends Action<{ src: StatusLaneId; dist: StatusLaneId; }> { }

export const addNewStatusLaneToBoard = (boardId: BoardId): AddNewStatusLaneToBoardAction => ({
    type: ActionType.AddNewStatusLaneToBoard,
    payload: boardId,
});

export const deleteStatusLane = (statusLaneId: StatusLaneId): DeleteStatusLaneAction => ({
    type: ActionType.DeleteStatusLanes,
    payload: statusLaneId,
});

export const detachStatusLaneFromBoard = (boardId: BoardId, statusLaneId: StatusLaneId): DetachStatusLaneFromBoardAction => ({
    type: ActionType.DetachStatusLaneFromBoard,
    payload: { boardId, statusLaneId },
});

export const moveStatusLane = (src: StatusLaneId, dist: StatusLaneId): MoveStatusLaneAction => ({
    type: ActionType.MoveStatusLane,
    payload: { src, dist },
});

import ActionType from '../constants/actionType';
import * as uuid from 'uuid';
import { Action, List, Operator, Mover, CardMovePosition } from '../models';
import { createReducer } from './createReducer';
import update = require('react-addons-update');

// const defaultState: List[] = [
//   {
//     id: uuid.v4(),
//     name: 'Open',
//     cardIds: [],
//   },
//   {
//     id: uuid.v4(),
//     name: 'In Progress',
//     cardIds: [],
//   },
//   {
//     id: uuid.v4(),
//     name: 'Resolved',
//     cardIds: [],
//   },
//   {
//     id: uuid.v4(),
//     name: 'Closed',
//     cardIds: [],
//   },
// ];
const defaultState: List[] = [];

const createList = (state: List[], action: Action<List>): List[] => {
    return state.concat(action.payload);
}

const updateList = (state: List[], action: Action<List>): List[] => (
    state.map(list => (
        list.id === action.payload.id ? Object.assign({}, list, action.payload) : list)
    )
)

const deleteList = (state: List[], action: Action<List>): List[] => (
    state.filter(list => list.id !== action.payload.id)
)

const attachToList = (state: List[], action: Action<Operator>): List[] => {
    const { listId, cardId } = action.payload;
    return state.map(list => {
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
    const { sourceCardId, targetCardId } = action.payload;
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
