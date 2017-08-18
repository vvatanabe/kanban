import { connect } from "react-redux";
import { BoardId } from "../../../../shared/domain/model";
import { boardQueryService } from "../../../application/board/BoardQueryService";
import { BindComponentProps } from "../../support";
import { default as Board, OwnProps, StateProps } from "./Board";

const bindStateToProps = (ownProps: OwnProps): StateProps => ({
    board: boardQueryService.viewBoard(new BoardId(ownProps.match.params.id)),
});

export default BindComponentProps(bindStateToProps)(Board);
