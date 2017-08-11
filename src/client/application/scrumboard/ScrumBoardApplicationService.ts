import * as Redux from "redux";
import * as cardModalsAction from "../../shared/actions/cardModals";
import * as cardsAction from "../../shared/actions/cards";
import * as statusLanesAction from "../../shared/actions/statusLanes";
import * as storyLanesAction from "../../shared/actions/storyLanes";
import { Action, AppState, BoardId, CardId, Identifier, StatusLane, StoryLaneId } from "../../shared/models";

export default class ScrumBoardDispatcher {

    constructor(
        private dispatch: Redux.Dispatch<Action<any>>,
        private getState: () => AppState,
        private boardId: BoardId,
    ) { }

    public addNewStoryLane() {
        const createCardAct = cardsAction.createCard();
        const createStoryLanesAct = storyLanesAction.create(createCardAct.payload.id);
        const attachStoryLaneToScrumBoardAct = storyLanesAction.attachToBoard(createStoryLanesAct.payload.id, this.boardId);
        this.dispatch(createCardAct);
        this.dispatch(createStoryLanesAct);
        this.dispatch(attachStoryLaneToScrumBoardAct);
    }

    public deleteStoryLane(storyLaneId: StoryLaneId) {
        const storyLane = this.getState().storyLanes.filter(lane => Identifier.equals(lane.id, storyLaneId))[0];
        const statusLanes = storyLane.statusLaneIds.map(laneId => {
            return this.getState().statusLanes.filter(lane => Identifier.equals(lane.id, laneId))[0];
        });
        const cardIds = statusLanes.reduce((prev, curr) => (prev.concat(curr.cardIds)), [] as CardId[]);
        this.dispatch(storyLanesAction.detachFromScrumBoard(this.boardId, storyLaneId));
        this.dispatch(storyLanesAction.deletes([storyLaneId]));
        this.dispatch(statusLanesAction.deleteStatusLanes(storyLane.statusLaneIds));
        this.dispatch(cardsAction.deletes(cardIds));
    }

    public moveStoryLane(from: StoryLaneId, to: StoryLaneId) {
        this.dispatch(storyLanesAction.move(this.boardId, from, to));
    }

    public openCardModal(cardId: CardId) {
        this.dispatch(cardModalsAction.open(this.boardId, cardId));
    }

}