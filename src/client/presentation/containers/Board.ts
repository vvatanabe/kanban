import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Action, AppState } from "../../shared/models";
import { default as Board, DispatchProps, OwnProps, StateProps } from "../components/Board";

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
    board: state.boards.find(board => {
        return board.id.value === ownProps.match.params.valueOfBoardId;
    }),
});

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>, ownProps: OwnProps): DispatchProps => ({});

export default connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(Board);
