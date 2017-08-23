import * as React from "react";
import { BoardId, KanbanBoard, ScrumBoard } from "../../../../shared/domain/model";
import Editer from "../Editer";

export interface StateProps {
    board?: KanbanBoard | ScrumBoard;
}

export interface OwnProps extends React.Props<{}> {
    id: BoardId;
    onClickBoardTile(boardId: BoardId);
    onClickBoardName(boardId: BoardId);
    onEditBoardName(boardId: BoardId, value: string);
    onClickDeleteBoardButton(boardId: BoardId);
}

const BoardTile: React.StatelessComponent<StateProps & OwnProps> = props => (
    <div className="board-tile" onClick={() => props.onClickBoardTile(props.id)}>
        <div className="board-tile__header" onClick={e => e.stopPropagation()}>
            <div className="board-tile__header__title">
                <Editer
                    value={props.board.name}
                    onValueClick={() => props.onClickBoardName(props.id)}
                    onEdit={value => props.onEditBoardName(props.id, value)}
                    editing={props.board.editing}
                />
            </div>
            <div className="board-tile__header__button">
                <button className="delete-bord-button"
                    onClick={() => props.onClickDeleteBoardButton(props.id)}>Delete</button>
            </div>
        </div>
    </div>
);

export default BoardTile;
