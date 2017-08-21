import { Column, ColumnId } from "../../../shared/domain/model";
import { getState } from "../../../shared/infractructure/persistence/redux/ReduxStore";

class ColumnQueryService {

    public viewColumn(columnId: ColumnId): Column {
        return getState().columns.find(column => column.id.equals(columnId));
    }

}

export const columnQueryService = new ColumnQueryService();
