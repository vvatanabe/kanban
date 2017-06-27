import { List } from "immutable";
import * as React from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import ProjectApplicationService from "../../application/project/ProjectApplicationService";
import * as models from "../../shared/models";
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
                <div key={board.id.value} className="bord-tile" onClick={() => props.history.push(`/board/${board.id.value}`)}>
                    <div className="bord-tile__header"
                        onClick={e => e.stopPropagation()}>
                        <div className="bord-tile__header__title">
                            <Editer
                                value={board.name}
                                onValueClick={() => props.openFormOfBoardName(board.id)}
                                onEdit={value => props.updateFormOfBoardName(board.id, value)}
                                editing={board.editingName}
                            />
                        </div>
                        <div className="bord-tile__header__button">
                            <button
                                className="delete-bord-button"
                                onClick={() => props.deleteBoard(board.id)}
                            >
                                Delete
                        </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default Project;
