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
    columnCardIds: List.of(),
});

const bindActionToProps = (ownProps: OwnProps): ActionProps => ({
    showFormOfColumnName() {
        columnCommandService.showFormOfColumnName(ownProps.id);
    },
    updateColumnName(name: string) {
        const command: UpdateColumnCommand = { name };
        columnCommandService.updateColumn(ownProps.id, command);
    },
    addCard() {
        const command: AddCardCommand = { summary: "New Card" };
        columnCommandService.addCard(ownProps.id, command);
    },
    deleteCard(id: CardId) {
        columnCommandService.deleteCard(ownProps.id, id);
    },
    attachCard(id: CardId) {
        columnCommandService.attachCard(ownProps.id, id);
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
