import { connect } from "react-redux";
import { BoardId } from "../../../../shared/domain/model";
import { boardTileQueryService } from "../../../application/board/boardTileQueryService";
import { BindComponentProps } from "../../support";
import { default as BoardTile, OwnProps, StateProps } from "./BoardTile";

const bindStateToProps = (ownProps: OwnProps): StateProps => ({
    board: boardTileQueryService.viewBoard(ownProps.id),
});

export default BindComponentProps(bindStateToProps)(BoardTile);
