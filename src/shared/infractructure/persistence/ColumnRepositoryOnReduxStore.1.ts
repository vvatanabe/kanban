import { injectable } from "inversify";
import { Column, ColumnId, ColumnRepository } from "../../domain/model/";
import { ColumnActionCreator } from "./redux/column";
import { dispatch, getState } from "./redux/ReduxStore";

@injectable()
export default class ColumnRepositoryOnReduxStore extends ColumnRepository {

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
