import * as React from "react";
import { CardId, ColumnId } from "../../../../shared/domain/model";
import * as model from "../../../../shared/domain/model";
import CardModal from "../cardmodal";
import Column from "../column";

export interface OwnProps extends React.Props<{}> {
    board: model.KanbanBoard;
}

export interface ActionProps {
    addColumn?(name: string);
    deleteColumn?(columnId: ColumnId);
    moveColumn?(src: ColumnId, dist: ColumnId);
    openCardModal?(cardId: CardId);
    closeCardModal?();
}

type Props = OwnProps & ActionProps;

const KanbanBoard: React.StatelessComponent<Props> = props => (
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
                    onClickCard={props.openCardModal}
                    onClickDeleteColumnButton={props.deleteColumn}
                    onHoverColumn={props.moveColumn}
                />
            ))}
        </div>
        {props.board.shouldBeOpenCardModal
            ? <CardModal data={props.board.cardModal} close={props.closeCardModal} />
            : null
        }
    </div>
);

export default KanbanBoard;
