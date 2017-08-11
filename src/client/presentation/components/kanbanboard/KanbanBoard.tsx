import * as React from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import TouchBackend from "react-dnd-touch-backend";
import Board from "../../../../shared/domain/model/board/Board";
import CardId from "../../../../shared/domain/model/card/CardId";
import ColumnId from "../../../../shared/domain/model/column/ColumnId";
import CardModal from "../containers/CardModal";
import Column from "../containers/Column";

export interface ActionProps {
    addNewCoulmn?();
    deleteCoulmn?(coulmnId: ColumnId);
    moveCoulmn?(src: ColumnId, dist: ColumnId);
    openCardModal?(cardId: CardId);
}

export interface OwnProps extends React.Props<{}> {
    board: Board;
}

const KanbanBoard: React.StatelessComponent<OwnProps & ActionProps> = props => (
    <div className="kanban-board">
        <h3>
            <span className="kanban-board-title">{props.board.name}</span>
            <button
                className="add-status-lane-button"
                onClick={props.addNewStatusLane}>Add Status Lane</button>
        </h3>
        <div className="status-lane-list">
            {props.board.statusLaneIds.map(laneId => (
                <Column
                    id={laneId}
                    key={laneId.value}
                    openCardModal={props.openCardModal}
                    deleteStatusLane={props.deleteStatusLane}
                    moveStatusLane={props.moveStatusLane}
                />
            ))}
        </div>
        {!!props.board.shouldBeOpenCardModal ? <CardModal context={props.board} data={props.board.cardModal} /> : null}
    </div>
);

export default DragDropContext(isMobile ? TouchBackend : HTML5Backend)(KanbanBoard);
