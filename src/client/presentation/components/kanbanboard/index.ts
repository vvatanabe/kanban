import { Board, BoardId, CardId, ColumnId } from "../../../../shared/domain/model";
import { AddCoulmnCommand } from "../../../application/kanbanboard/AddCoulmnCommand";
import { kanbanBoardCommandService } from "../../../application/kanbanboard/KanbanBoardCommandService";
import { kanbanBoardQueryService } from "../../../application/kanbanboard/KanbanBoardQueryService";
import { BindComponentProps } from "../../support";
import { ActionProps, default as KanbanBoard, OwnProps, StateProps } from "./KanbanBoard";

const bindStateToProps = (ownProps: OwnProps): StateProps => ({
    board: kanbanBoardQueryService.viewBoard(ownProps.id),
});

const bindActionToProps = (ownProps: OwnProps, stateProps: StateProps): ActionProps => ({
    addColumn: (name: string) => {
        const command: AddCoulmnCommand = { name };
        kanbanBoardCommandService.addColumn(ownProps.board.id, command);
    },
    deleteColumn: (coulmnId: ColumnId) => {
        kanbanBoardCommandService.deleteCoulmn(ownProps.board.id, coulmnId);
    },
    moveColumn: (src: ColumnId, dist: ColumnId) => kanbanBoardCommandService.moveCoulmnOnBoard(src, dist),
    openCardModal: (cardId: CardId) => kanbanBoardCommandService.openCardModalOnBoard(cardId),
});

export default BindComponentProps(
    bindStateToProps,
    bindActionToProps,
)(KanbanBoard);
