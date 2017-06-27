import { injectable } from "inversify";
import Board from "../../domain/model/board/Board";
import BoardId from "../../domain/model/board/BoardId";
import BoardRepository from "../../domain/model/board/BoardRepository";
import { BoardActionCreator } from "./reduxstore/board";
import { dispatch } from "./reduxstore/ReduxStore";

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

}
