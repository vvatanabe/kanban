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
import { Action, StatusLane, StatusLaneId, CardId } from '../models';
import { createReducer } from './createReducer';
import update = require('react-addons-update');
import { List } from 'immutable';

const createStatusLane = (state: List<StatusLane>, action: Action<StatusLane>): List<StatusLane> => {
    return state.push(action.payload);
}

const updateStatusLane = (state: List<StatusLane>, action: Action<StatusLane>): List<StatusLane> => (
    state.map(statusLane => (
        statusLane.equals(action.payload.id) ? statusLane.copy(action.payload) : statusLane
    )).toList()
)

const deleteStatusLane = (state: List<StatusLane>, action: Action<StatusLaneId>): List<StatusLane> => (
    state.filter(statusLane => !statusLane.id.equals(action.payload)).toList()
)

const attachCardToStatusLane = (state: List<StatusLane>, action: Action<[StatusLaneId, CardId]>): List<StatusLane> => {
    const statusLaneId = action.payload[0];
    const attachCardId = action.payload[1];
    return state.map(statusLane => {
        if (statusLane.cardIds.some(cardId => cardId.equals(attachCardId))) {
            // Remove the moving card from its original position
            const cardIds = statusLane.cardIds.filter(cardId => !cardId.equals(attachCardId)).toList();
            return statusLane.copy({ cardIds });
        }
        if (statusLane.id.equals(statusLaneId)) {
            // Move the moving card to the specified position
            const cardIds = statusLane.cardIds.push(attachCardId);
            return statusLane.copy({ cardIds });
        }
        return statusLane;
    }).toList();
}

const detachCardFromStatusLane = (state: List<StatusLane>, action: Action<[StatusLaneId, CardId]>): List<StatusLane> => {
    const statusLaneId = action.payload[0];
    const detachCardId = action.payload[1];
    return state.map(statusLane => {
        if (statusLane.id.equals(statusLaneId)) {
            const cardIds = statusLane.cardIds.filter(cardId => !cardId.equals(detachCardId)).toList();
            return statusLane.copy({ cardIds });
        } else {
            return statusLane;
        }
    }).toList();
}

const moveCardOnStatusLane = (lanes: List<StatusLane>, action: Action<[CardId, CardId]>): List<StatusLane> => {

    const srcCardId = action.payload[0];
    const distCardId = action.payload[1];

    const existsCard = searchCardId => statusLane => statusLane.cardIds.some(cardId => cardId.equals(searchCardId))
    const srcLaneIndex = lanes.findIndex(existsCard(srcCardId));
    const distLaneIndex = lanes.findIndex(existsCard(distCardId));
    const srcLane = lanes.get(srcLaneIndex);
    const distLane = lanes.get(distLaneIndex);

    const sameCard = searchCardId => cardId => cardId.equals(searchCardId);
    const srcCardIndex = srcLane.cardIds.findIndex(sameCard(srcCardId));
    const distCardIndex = distLane.cardIds.findIndex(sameCard(distCardId));

    if (srcLane.equals(distLane)) {
        // If the destination of the card is the same lane
        return lanes.set(srcCardIndex, srcLane.copy({
            cardIds: srcLane.cardIds
                .delete(srcCardIndex) // Delete the card from current position
                .insert(distCardIndex, srcCardId), // Insert the card to next position
        }));
    }

    // If the destination of the card is the other lane
    return lanes
        .set(srcLaneIndex, srcLane.copy({
            cardIds: srcLane.cardIds.delete(srcCardIndex) // Delete the card from current position
        }))
        .set(distLaneIndex, distLane.copy({
            cardIds: distLane.cardIds.insert(distCardIndex, srcCardId) // Insert the card to next position
        }));
}

export const statusLanes = createReducer<List<StatusLane>>(List.of(), {
    [ActionType.CreateStatusLane]: createStatusLane,
    [ActionType.UpdateStatusLane]: updateStatusLane,
    [ActionType.DeleteStatusLane]: deleteStatusLane,
    [ActionType.AttachCardToStatusLane]: attachCardToStatusLane,
    [ActionType.DetachCardFromStatusLane]: detachCardFromStatusLane,
    [ActionType.MoveCardOnStatusLane]: moveCardOnStatusLane
});