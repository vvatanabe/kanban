import { CardId, ColumnId } from "../../../../shared/domain/model";
import * as model from "../../../../shared/domain/model";
import { AddCardCommand } from "../../../application/column/AddCardCommand";
import { columnCommandService } from "../../../application/column/ColumnCommandService";
import { columnQueryService } from "../../../application/column/ColumnQueryService";
import { MoveCardCommand } from "../../../application/column/MoveCardCommand";
import { UpdateColumnCommand } from "../../../application/column/UpdateColumnCommand";
import { BindComponentProps } from "../../support";
import { ActionProps, default as Column, OwnProps, StateProps } from "./Column";

const bindStateToProps = (ownProps: OwnProps): StateProps => ({
    column: columnQueryService.viewColumn(ownProps.id),
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
    moveCard(src: CardId, dist: CardId) {
        const command: MoveCardCommand = { src, dist };
        columnCommandService.moveCard(command);
    },
});

export default BindComponentProps(
    bindStateToProps,
    bindActionToProps,
)(Column);
