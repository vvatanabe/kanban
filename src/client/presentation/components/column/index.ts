import { CardId, ColumnId } from "../../../../shared/domain/model";
import * as model from "../../../../shared/domain/model";
import { AddCardCommand } from "../../../application/column/AddCardCommand";
import { columnCommandService } from "../../../application/column/ColumnCommandService";
import { columnQueryService } from "../../../application/column/ColumnQueryService";
import { UpdateColumnCommand } from "../../../application/column/UpdateColumnCommand";
import { BindComponentProps } from "../../support";
import { ActionProps, default as Column, OwnProps, StateProps } from "./Column";

const bindStateToProps = (ownProps: OwnProps): StateProps => ({
    column: columnQueryService.viewColumn(ownProps.id),
});

const bindActionToProps = (ownProps: OwnProps): ActionProps => ({
    onClickColumnName() {
        columnCommandService.showFormOfColumnName(ownProps.id);
    },
    onEditColumnName(name: string) {
        const command: UpdateColumnCommand = { name };
        columnCommandService.updateColumn(ownProps.id, command);
    },
    onClickAddCardButton() {
        const command: AddCardCommand = { summary: "New Card" };
        columnCommandService.addCard(ownProps.id, command);
    },
    onClickDeleteCardButton(cardId: CardId) {
        columnCommandService.deleteCard(ownProps.id, cardId);
    },
    onHoverCard(hoverCardId: CardId) {
        columnCommandService.attachCard(ownProps.id, hoverCardId);
    },
    onHoverCardOverCardInColumn(hoverCardId: CardId, hoveredCardId: CardId) {
        columnCommandService.moveCard(ownProps.id, hoverCardId, hoveredCardId);
    },
});

export default BindComponentProps(
    bindStateToProps,
    bindActionToProps,
)(Column);
