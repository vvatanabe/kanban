import * as Redux from "redux";
import Board from "../../../shared/domain/model/board/Board";
import BoardId from "../../../shared/domain/model/board/BoardId";
import { getState } from "../../../shared/infractructure/persistence/reduxstore/ReduxStore";

export default class KanbanBoardQueryService {

    public viewBoard(boardId: BoardId): Board {
        return getState().boards.find((board: Board) => board.id.equals(boardId));
    }

}

export const kanbanBoardQueryService = new KanbanBoardQueryService();
