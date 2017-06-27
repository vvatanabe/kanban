import Board from "../../../../shared/domain/model/board/Board";
import BoardId from "../../../../shared/domain/model/board/BoardId";
import CardId from "../../../../shared/domain/model/card/CardId";
import CoulmnId from "../../../../shared/domain/model/column/ColumnId";
import { kanbanBoardCommandService } from "../../../application/kanbanboard/KanbanBoardCommandService";
import { kanbanBoardQueryService } from "../../../application/kanbanboard/KanbanBoardQueryService";
import { BindComponentProps } from "../../support";
import { ActionProps, default as KanbanBoard, OwnProps, StateProps } from "./KanbanBoard";

const bindStateToProps = (ownProps: OwnProps): StateProps => ({
    board: kanbanBoardQueryService.viewBoard(ownProps.id),
});

const bindActionToProps = (ownProps: OwnProps, stateProps: StateProps): ActionProps => ({
    addNewCoulmn: () => kanbanBoardCommandService.addNewCoulmnToBoard(ownProps.board.id),
    deleteCoulmn: (coulmnId: CoulmnId) => kanbanBoardCommandService.deleteCoulmnFromBoard(coulmnId, ownProps.board.id),
    moveCoulmn: (src: CoulmnId, dist: CoulmnId) => kanbanBoardCommandService.moveCoulmnOnBoard(src, dist),
    openCardModal: (cardId: CardId) => kanbanBoardCommandService.openCardModalOnBoard(cardId),
});

export default BindComponentProps(
    bindStateToProps,
    bindActionToProps,
)(KanbanBoard);
