import * as Redux from 'redux';
import * as storyLanesAction from '../../shared/actions/storyLanes';
import { Action, AppState, BoardId, StoryLaneId, StatusLaneId, CardId, Card } from '../../shared/models';


export default class StoryLaneDispatcher {
    
    constructor(
        private dispatch: Redux.Dispatch<Action<any>>,
        private getState: () => AppState,
        private storyLaneId: StoryLaneId
        ){}

    public updateStoryLaneName(cardId: CardId, value: string) {
        const updateCard = {
            id: cardId,
            editing: false,
            summary: value
        } as Card;
        Card.create({
            id: cardId,
            editing: false,
            summary: value
        })
        this.dispatch(storyLanesAction.updateStoryLaneName(cardId, value));
    }

}