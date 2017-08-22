import { List } from "immutable";
import * as React from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import ProjectApplicationService from "../../application/project/ProjectApplicationService";
import * as models from "../../shared/models";
import BoardTile from "../boardtile";
import Board from "../containers/Board";
import Editer from "./Editer";


export interface StateProps {
    boards?: List<models.Board>;
}

export interface DispatchProps {
    service: ProjectApplicationService;
}

export type OwnProps = RouteComponentProps<{}>;

export type Props = OwnProps & StateProps & DispatchProps & React.Props<{}>;

const Project: React.StatelessComponent<Props> = props => (
    <div>
        <h3>
            <span className="bord-title">Boards</span>
            <button className="add-list-button" onClick={props.addScrumBoard}>Add Scrum Bord</button>
            <button className="add-list-button" onClick={props.addKanbanBoard}>Add Kanban Bord</button>
        </h3>
        <div className="bord-tile-list">
            {props.boards.map(board => (
                <BoardTile
                    board={board}
                    onClickBoardTile={}
                    onClickBoardName={}
                    onEditBoardName={}
                    onClickDeleteBoardButton={props.deleteBoard}
                />
            ))}
        </div>
    </div>
);

export default Project;
