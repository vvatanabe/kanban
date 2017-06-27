import * as Redux from 'redux';
import { connect } from 'react-redux';
import { default as StatusLane, StatusLaneProps, StatusLaneStateProps, StatusLaneDispatchProps } from '../components/StatusLane';
import Action from '../../shared/actions/action';
import * as listsActions from '../../shared/actions/lists';
import * as storyLanesActions from '../../shared/actions/storyLanes';
import * as cardsActions from '../../shared/actions/cards';
import { AppState, Card } from '../../shared/models';
import { Item } from '../../shared/constants/itemType';

const mapStateToProps = (state: AppState, ownProps: StatusLaneProps): StatusLaneStateProps => {
    const ownStatusLane = state.statusLanes.filter(statusLane => statusLane.id === ownProps.id)[0];
    return {
        statusLane: ownStatusLane
    };
};

const mapDispatchToProps = <T>(dispatch: Redux.Dispatch<Action<T>>, ownProps: StatusLaneProps): StatusLaneDispatchProps => ({

});

export default connect<StatusLaneStateProps, StatusLaneDispatchProps, StatusLaneProps>(
    mapStateToProps,
    mapDispatchToProps
)(StatusLane);
