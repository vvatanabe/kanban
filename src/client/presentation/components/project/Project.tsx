import { List } from "immutable";
import * as React from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { BoardId, CardId, ColumnId } from "../../../../shared/domain/model";
import * as model from "../../../../shared/domain/model";
import Board from "../board/Board";
import BoardTile from "../boardtile";
import Editer from "../Editer";

export interface StateProps {
    project: model.Project;
}

export interface ActionProps {
    onClickAddScrumBoardButton();
    onClickAddKanbanBoardButton();
    onClickBoardTile(boardId: BoardId);
    onClickBoardName(boardId: BoardId);
    onEditBoardName(boardId: BoardId, value: string);
    onClickDeleteBoardButton(boardId: BoardId);
}

export type OwnProps = RouteComponentProps<{ id: string }>;

export type Props = OwnProps & StateProps & ActionProps;

const Project: React.StatelessComponent<Props> = props => (
    <div>
        <h3>
            <span className="board-title">Boards</span>
            <button className="add-scrum-board-button" onClick={props.onClickAddScrumBoardButton}>Add Scrum Bord</button>
            <button className="add-kanban-board-button" onClick={props.onClickAddKanbanBoardButton}>Add Kanban Bord</button>
        </h3>
        <div className="bord-tile-list">
            {props.project.boardIds.map(id => (
                <BoardTile
                    id={id}
                    onClickBoardTile={props.onClickBoardTile}
                    onClickBoardName={props.onClickBoardName}
                    onEditBoardName={props.onEditBoardName}
                    onClickDeleteBoardButton={props.onClickDeleteBoardButton}
                />
            ))}
        </div>
    </div>
);

export default Project;
