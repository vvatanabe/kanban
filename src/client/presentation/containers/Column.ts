import { connect } from "react-redux";
import { Dispatch } from "redux";
import ColumnDispatcher from "../dispatchers/ColumnDispatcher";
import { Action, AppState } from "../../shared/models";
import { default as Column, DispatchProps, OwnProps, StateProps } from "../components/Column";
import store from "../store";

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => {
    const ownStatusLane = state.statusLanes.find(statusLane => statusLane.id.equals(ownProps.id));
    return {
        lane: ownStatusLane,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>, ownProps: OwnProps): DispatchProps => ({
    statusLaneDispatcher: new ColumnDispatcher(dispatch, ownProps.id),
});

export default connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(Column);
