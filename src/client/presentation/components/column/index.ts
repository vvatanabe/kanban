import { CardId, ColumnId } from "../../../../shared/domain/model";
import * as model from "../../../../shared/domain/model";
import { AddCardCommand } from "../../../application/column/AddCardCommand";
import { columnCommandService } from "../../../application/column/ColumnCommandService";
import { UpdateColumnCommand } from "../../../application/column/UpdateColumnCommand";
import { BindComponentProps } from "../../support";
import { ActionProps, default as Column, OwnProps, StateProps } from "./Column";

const bindStateToProps = (ownProps: OwnProps): StateProps => {
    const ownStatusLane = state.statusLanes.find(statusLane => statusLane.id.equals(ownProps.id));
    return {
        lane: ownStatusLane,
    };
};

const bindActionToProps = (ownProps: OwnProps): ActionProps => ({
    onClickColumnName() {
        columnCommandService.showFormOfColumnName(ownProps.id);
    },
    onEditColumnName(name: string) {
        const command: UpdateColumnCommand = { name };
        columnCommandService.updateColumn(ownProps.id, command);
    },
    onHoverCardOverCard(src: CardId, dist: CardId) {
        columnCommandService.moveCard(ownProps.id, src, dist);
    },
    onClickAddCardButton() {
        const command: AddCardCommand = { summary: "New Card" };
        columnCommandService.addCard(ownProps.id, command);
    },
    onClickDeleteCardButton(cardId: CardId) {
        columnCommandService.deleteCard(ownProps.id, cardId);
    },
    onHoverCard(cardId: CardId) {
        columnCommandService.attachCard(ownProps.id, cardId);
    },
});

export default BindComponentProps(
    bindStateToProps,
    bindActionToProps,
)(Column);
