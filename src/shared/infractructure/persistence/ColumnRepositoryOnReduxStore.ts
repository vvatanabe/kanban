import { injectable } from "inversify";
import { Column, ColumnId, ColumnRepository } from "../../domain/model/";
import { addColumn, deleteColumn, updateColumn } from "./redux/column";
import { dispatch, getState } from "./redux/ReduxStore";

@injectable()
export default class ColumnRepositoryOnReduxStore extends ColumnRepository {

    public add(column: Column) {
        dispatch(addColumn(column));
    }

    public update(column: Column) {
        dispatch(updateColumn(column));
    }

    public delete(id: ColumnId) {
        dispatch(deleteColumn(id));
    }

    public find(id: ColumnId): Column {
        return getState().columns.find(column => column.id.equals(id));
    }

}
