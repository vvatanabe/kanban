import { CardId, ColumnId } from "../../../../shared/domain/model";
import * as model from "../../../../shared/domain/model";
import { cardQueryService } from "../../../application/card/CardQueryService";
import { BindComponentProps } from "../../support";

import { default as Card, OwnProps, StateProps } from "./Card";

const bindStateToProps = (ownProps: OwnProps): StateProps => ({
    card: cardQueryService.findCard(ownProps.id),
});

export default BindComponentProps(bindStateToProps)(Card);
