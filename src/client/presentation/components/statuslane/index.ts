import { CardId, ColumnId } from "../../../../shared/domain/model";
import * as model from "../../../../shared/domain/model";
import { BindComponentProps } from "../../support";
import { ActionProps, default as StatusLane, OwnProps, StateProps } from "./StatusLane";

const bindStateToProps = (ownProps: OwnProps): StateProps => ({
    statusLane: statusLaneQueryService.viewStatusLane(ownProps.id),
});

const bindActionToProps = (ownProps: OwnProps): ActionProps => ({
    addCard() {
        const command: AddCardCommand = { summary: "New Card" };
        statusLaneCommandService.addCard(ownProps.id, command);
    },
    deleteCard(id: CardId) {
        statusLaneCommandService.deleteCard(ownProps.id, id);
    },
    attachCard(id: CardId) {
        statusLaneCommandService.attachCard(ownProps.id, id);
    },
    moveCard(src: CardId, dist: CardId) {
        const command: MoveColumnCardCommand = { src, dist };
        statusLaneCommandService.moveCard(command);
    },
});

export default BindComponentProps(
    bindStateToProps,
    bindActionToProps,
)(StatusLane);
