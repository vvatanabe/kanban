import { connect } from "react-redux";
import * as Redux from "redux";
import StatusLaneDispatcher from "../../shared/dispatchers/StatusLaneDispatcher";
import { Action, AppState, Card } from "../../shared/models";
import { default as StatusLane, DispatchProps, OwnProps, StateProps } from "../components/StatusLane";
import store from "../store";

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => {
    const ownStatusLane = state.statusLanes.find(statusLane => statusLane.id.equals(ownProps.id));
    const status = state.statuses.find(status => equals(status.id, ownStatusLane.statusId));
    return {
        lane: ownStatusLane,
        name: status.name,
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<Action<any>>, ownProps: OwnProps): DispatchProps => ({
    statusLaneDispatcher: new StatusLaneDispatcher(dispatch, store.getState, ownProps.id),
});

export default connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(StatusLane);
