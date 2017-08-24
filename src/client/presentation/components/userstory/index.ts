import * as Redux from 'redux';
import { connect } from 'react-redux';
import { default as UserStoryLane, StoryLaneProps, StoryLaneStateProps, StoryLaneDispatchProps } from '../components/UserStoryLane';
import * as listsActions from '../../shared/actions/lists';
import * as storyLanesActions from '../../shared/actions/storyLanes';
import * as cardsActions from '../../shared/actions/cards';
import { Action, AppState, StoryLaneId, Card, CardId } from '../../shared/models';
import { Item } from '../../shared/constants/itemType';
import StoryLaneDispatcher from '../../shared/dispatchers/StoryLaneDispatcher';
import store from '../store';

const mapStateToProps = (state: AppState, ownProps: StoryLaneProps): StoryLaneStateProps => {
    const ownStoryLane = state.storyLanes.filter(storyLane => storyLane.id === ownProps.id)[0];
    const ownStoryCard = state.cards.filter(card => card.id === ownStoryLane.cardId)[0];
    return {
        storyLane: ownStoryLane,
        storyCard: ownStoryCard
    };
};

const mapDispatchToProps = <T>(dispatch: Redux.Dispatch<Action<T>>, ownProps: StoryLaneProps): StoryLaneDispatchProps => ({
    storyLaneDispatcher: new StoryLaneDispatcher(dispatch, store.getState, ownProps.id);
});

export default connect<StoryLaneStateProps, StoryLaneDispatchProps, StoryLaneProps>(
    mapStateToProps,
    mapDispatchToProps
)(UserStoryLane);
