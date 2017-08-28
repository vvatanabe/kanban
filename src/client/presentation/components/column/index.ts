import { CardId, ColumnId } from "../../../../shared/domain/model";
import * as model from "../../../../shared/domain/model";
import { AddCardCommand } from "../../../application/column/AddCardCommand";
import { ColumnCard } from "../../../application/column/ColumnCard";
import { columnCommandService } from "../../../application/column/ColumnCommandService";
import { columnQueryService } from "../../../application/column/ColumnQueryService";
import { MoveColumnCardCommand } from "../../../application/column/MoveColumnCardCommand";
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
    attachColumnCard(hoverCardId: CardId) {
        columnCommandService.attachCard(ownProps.id, hoverCardId);
    },
    moveCard(src: ColumnCard, dist: ColumnCard) {
        const command: MoveColumnCardCommand = { src, dist };
        columnCommandService.moveColumnCard(command);
    },
});

export default BindComponentProps(
    bindStateToProps,
    bindActionToProps,
)(Column);
