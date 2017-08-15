import * as React from "react";
import { RouteComponentProps } from "react-router";
import BoardType from "../../shared/constants/BoardType";
import * as models from "../../shared/models";
import KanbanBoard from "./board/KanbanBoard";
import ScrumBoard from "../containers/ScrumBoard";

export interface StateProps {
    board: BoardId;
}

export interface ActionProps {
    showFormOfBoardName();
    updateFormOfBoardName(value: string);
}

export interface OwnProps extends React.Props<{}> {
    board: Board;
    deleteBoard(boardId: BoardId);
}

export type Props = StateProps & DispatchProps & OwnProps;

const BoardTile: React.StatelessComponent<Props> = props => (
    <div className="bord-tile" key={board.id.value} onClick={() => props.history.push(`/board/${board.id.value}`)}>
        <div className="bord-tile__header" onClick={e => e.stopPropagation()}>
            <div className="bord-tile__header__title">
                <Editer
                    value={props.board.name}
                    onValueClick={props.openFormOfBoardName}
                    onEdit={props.updateFormOfBoardName}
                    editing={props.board.editing}
                />
            </div>
            <div className="bord-tile__header__button">
                <button className="delete-bord-button" onClick={() => props.deleteBoard(props.id)}>Delete</button>
            </div>
        </div>
    </div>
);

export default BoardTile;
