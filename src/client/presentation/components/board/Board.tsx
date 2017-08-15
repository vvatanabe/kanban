import * as React from "react";
import { RouteComponentProps } from "react-router";
import BoardType from "../../shared/constants/BoardType";
import * as models from "../../shared/models";
import KanbanBoard from "./board/KanbanBoard";
import ScrumBoard from "../containers/ScrumBoard";

export interface StateProps {
    board?: models.KanbanBoard | models.ScrumBoard;
}

export interface DispatchProps { }

export interface OwnProps extends RouteComponentProps<{ valueOfBoardId: string }> { }

export type Props = StateProps & DispatchProps & OwnProps;

const Board: React.StatelessComponent<Props> = props => (
    props.board.type === BoardType.KanbanBoard ? <KanbanBoard board={props.board} /> : <ScrumBoard board={props.board} />
);

export default Board;
