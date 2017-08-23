import * as React from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import TouchBackend from "react-dnd-touch-backend";
import { RouteComponentProps } from "react-router";
import * as model from "../../../../shared/domain/model";
import { BoardType } from "../../../../shared/domain/model";
import { isMobile } from "../../support";
import KanbanBoard from "../kanbanboard";
import ScrumBoard from "../scrumboard";

export interface StateProps {
    board?: model.KanbanBoard | model.ScrumBoard;
}

export interface OwnProps extends RouteComponentProps<{ id: string }> { }

const Board: React.StatelessComponent<OwnProps & StateProps> = props => (
    props.board.type === BoardType.KanbanBoard ?
        <KanbanBoard board={props.board} /> : <ScrumBoard board={props.board} />
);

export default DragDropContext(isMobile ? TouchBackend : HTML5Backend)(Board);
