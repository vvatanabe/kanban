import * as React from "react";
import { BoardId, KanbanBoard, ScrumBoard } from "../../../../shared/domain/model";
import Editer from "../Editer";

export interface OwnProps extends React.Props<{}> {
    board: KanbanBoard | ScrumBoard;
    // () => props.history.push(`/board/${props.id.value}`)
    onClickBoardTile(boardId: BoardId);
    onClickBoardName(boardId: BoardId);
    onEditBoardName(boardId: BoardId, value: string);
    onClickDeleteBoardButton(boardId: BoardId);
}

const BoardTile: React.StatelessComponent<OwnProps> = props => (
    <div className="board-tile" onClick={() => props.onClickBoardTile(props.board.id)}>
        <div className="board-tile__header" onClick={e => e.stopPropagation()}>
            <div className="board-tile__header__title">
                <Editer
                    value={props.board.name}
                    onValueClick={() => props.onClickBoardName(props.board.id)}
                    onEdit={value => props.onEditBoardName(props.board.id, value)}
                    editing={props.board.editing}
                />
            </div>
            <div className="board-tile__header__button">
                <button className="delete-bord-button"
                    onClick={() => props.onClickDeleteBoardButton(props.board.id)}>Delete</button>
            </div>
        </div>
    </div>
);

export default BoardTile;
