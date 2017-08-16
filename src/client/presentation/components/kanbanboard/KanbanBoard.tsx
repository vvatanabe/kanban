import * as React from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import TouchBackend from "react-dnd-touch-backend";
import { CardId, ColumnId } from "../../../../shared/domain/model";
import * as model from "../../../../shared/domain/model";
import { isMobile } from "../../support";
import { CardModal } from "../cardmodal";
import { Column } from "../column";

export interface ActionProps {
    addColumn?(name: string);
    deleteColumn?(columnId: ColumnId);
    moveColumn?(src: ColumnId, dist: ColumnId);
    openCardModal?(cardId: CardId);
}

export interface OwnProps extends React.Props<{}> {
    board: model.KanbanBoard;
}

const KanbanBoard: React.StatelessComponent<OwnProps & ActionProps> = props => (
    <div className="kanban-board">
        <h3>
            <span className="kanban-board-name">{props.board.name}</span>
            <button
                className="add-column-button"
                onClick={() => props.addColumn("New Column")}>Add Column</button>
        </h3>
        <div className="columns">
            {props.board.columnIds.map(columnId => (
                <Column
                    id={columnId}
                    key={columnId.value}
                    openCardModal={props.openCardModal}
                    deleteStatusLane={props.deleteColumn}
                    moveStatusLane={props.moveColumn}
                />
            ))}
        </div>
        {!!props.board.shouldBeOpenCardModal ? <CardModal context={props.board} data={props.board.cardModal} /> : null}
    </div >
);

export default DragDropContext(isMobile ? TouchBackend : HTML5Backend)(KanbanBoard);
