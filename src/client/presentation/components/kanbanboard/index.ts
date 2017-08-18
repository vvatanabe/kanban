import { Board, BoardId, CardId, ColumnId } from "../../../../shared/domain/model";
import { AddCoulmnCommand } from "../../../application/kanbanboard/AddCoulmnCommand";
import { kanbanBoardCommandService } from "../../../application/kanbanboard/KanbanBoardCommandService";
import { BindComponentProps } from "../../support";
import { ActionProps, default as KanbanBoard, OwnProps } from "./KanbanBoard";

const bindActionToProps = (ownProps: OwnProps): ActionProps => ({
    addColumn: (name: string) => {
        const command: AddCoulmnCommand = { name };
        kanbanBoardCommandService.addColumn(ownProps.board.id, command);
    },
    deleteColumn: (coulmnId: ColumnId) => {
        kanbanBoardCommandService.deleteCoulmn(ownProps.board.id, coulmnId);
    },
    moveColumn: (src: ColumnId, dist: ColumnId) => {
        kanbanBoardCommandService.moveCoulmn(ownProps.board.id, src, dist);
    },
    openCardModal: (cardId: CardId) => {
        kanbanBoardCommandService.openCardModal(ownProps.board.id, cardId);
    },
});

export default BindComponentProps(
    null,
    bindActionToProps,
)(KanbanBoard);
