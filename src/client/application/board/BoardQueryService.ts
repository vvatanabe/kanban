import * as Redux from "redux";
import { BoardId, KanbanBoard, ScrumBoard } from "../../../shared/domain/model";
import { getState } from "../../../shared/infractructure/persistence/redux/ReduxStore";

class BoardQueryService {

    public viewBoard(boardId: BoardId): KanbanBoard | ScrumBoard {
        return getState().kanbnaBoards
            .concat(getState().scrumBoards)
            .find(board => board.id.equals(boardId));
    }

}

export const boardQueryService = new BoardQueryService();
