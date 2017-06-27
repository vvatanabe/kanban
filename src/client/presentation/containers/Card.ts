import { connect } from "react-redux";
import * as Redux from "redux";
import { Action, AppState } from "../../shared/models";
import { default as Card, DispatchProps, OwnProps, StateProps } from "../components/Card";

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => {
    const ownCard = state.cards.find(card => card.equals(ownProps.id));
    return { card: ownCard };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<Action<any>>): DispatchProps => ({});

export default connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(Card);
