import * as Redux from 'redux';
import { connect } from 'react-redux';
import { default as StoryLane, StoryLaneProps, StoryLaneStateProps, StoryLaneDispatchProps } from '../components/StoryLane';
import Action from '../../shared/actions/action';
import * as listsActions from '../../shared/actions/lists';
import * as storyLanesActions from '../../shared/actions/storyLanes';
import * as cardsActions from '../../shared/actions/cards';
import { AppState, Card } from '../../shared/models';
import { Item } from '../../shared/constants/itemType';

const mapStateToProps = (state: AppState, ownProps: StoryLaneProps): StoryLaneStateProps => {
    const ownLane = state.storylanes.filter(lane => lane.id === ownProps.id)[0];
    const ownCard = state.cards.filter(card => card.id === ownProps.card.id)[0];
    return {
        lane: ownLane,
        card: ownCard
    };
};

const mapDispatchToProps = <T>(dispatch: Redux.Dispatch<Action<T>>, ownProps: StoryLaneProps): StoryLaneDispatchProps => ({
    createCard: (laneId: string) => {
        const cardAct = cardsActions.createCard('New card');
        dispatch(cardAct);
        const laneAct = storyLanesActions.attachCard(laneId, cardAct.payload.id);
        dispatch(laneAct);
    },
    // TODO リファクタ
    deleteCard: (laneId: string, cardId: string) => {
        dispatch(cardsActions.deleteCard(cardId));
        if (laneId) {
            dispatch(storyLanesActions.detachCard(laneId, cardId));
        }
    },
    // TODO リファクタ
    editCard: (cardId: string) => {
        dispatch(cardsActions.editCard(cardId));
    },
    // TODO リファクタ
    updateCard: (cardId: string, value: string) => {
        const updateCard = {
            id: cardId,
            editing: false,
            summary: value
        } as Card;
        dispatch(cardsActions.updateCard(updateCard));
    },
    moveCard: (sourceId: string, targetId: string) => {
        dispatch(storyLanesActions.moveCard(ownProps.id, sourceId, targetId));
    },
    attachToLane: (targetId: string, sourceId: string) => {
        dispatch(storyLanesActions.attachCard(targetId, sourceId));
    }
});

export default connect<StoryLaneStateProps, StoryLaneDispatchProps, StoryLaneProps>(
    mapStateToProps,
    mapDispatchToProps
)(StoryLane);
