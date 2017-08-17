import { injectable } from "inversify";
import { Board, BoardId, BoardRepository } from "../../domain/model/";
import { dispatch, getState } from "./redux/ReduxStore";
import { BoardActionCreator } from "./reduxstore/board";

@injectable()
export default class BoardRepositoryOnReduxStore extends BoardRepository {

    public add(board: Board) {
        dispatch(BoardActionCreator.add(board));
    }

    public update(board: Board) {
        dispatch(BoardActionCreator.update(board));
    }

    public delete(boardId: BoardId) {
        dispatch(BoardActionCreator.delete(boardId));
    }

    deleteCardsInColumn

}
