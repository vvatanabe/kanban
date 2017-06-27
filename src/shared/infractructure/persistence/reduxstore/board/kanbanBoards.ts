import * as uuid from "uuid";
import ActionType from "../constants/ActionType";
import BoardType from "../constants/BoardType";
import { Action, Board, BoardId, StoryLane, StoryLaneId } from "../models";

export const addNewBoard = (): Action<{}> => ({
    type: ActionType.AddNewKanbanBoard,
    payload: {},
});

export const deleteBoard = (id: BoardId): Action<BoardId> => ({
    type: ActionType.DeleteBoard,
    payload: id,
});

export const updateBoardName = (id: BoardId, name: string): Action<{ id: BoardId, name: string }> => ({
    type: ActionType.UpdateBoardName,
    payload: { id, name },
});

export const showBoardNameForm = (id: BoardId): Action<BoardId> => ({
    type: ActionType.ShowBoardNameForm,
    payload: id,
});
