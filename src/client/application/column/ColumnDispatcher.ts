import * as Redux from "redux";
import * as cardsAction from "../../shared/actions/cards";
import * as statusLanesAction from "../../shared/actions/statusLanes";
import * as storyLanesAction from "../../shared/actions/storyLanes";
import { Action, AppState, BoardId, CardId, Identifier, Column, ColumnId, UserStoryId } from "../../shared/models";

export default class ColumnDispatcher {

    constructor(
        private readonly dispatch: Redux.Dispatch<Action<any>>,
        private readonly id: ColumnId,
    ) { }

    public addNewCard() {
        const createCardAct = cardsAction.createCard();
        const attachCardToCoulmnAct = cardsAction.attachCardToCoulmn(this.id, createCardAction.payload.id);
        this.dispatch(createCardAct);
        this.dispatch(attachCardToCoulmnAct);
    }

    public deleteCard(cardId: CardId) {
        const detachCardFromCoulmnAct = cardsAction.detachCardFromCoulmn(this.id, cardId);
        const deleteCardAct = cardsAction.deleteCard(cardId);
        this.dispatch(detachCardFromCoulmnAct);
        this.dispatch(deleteCardAct);
    }

    public attachCard(cardId: CardId) {

    }

    public moveCard(from: CardId, to: CardId) {
        // TODO
    }

    public showNameForm() {
        this.dispatch(statusLanesAction.showStatusLaneNameForm(this.statusLaneId));
    }

    public updateName(name: String) {
        this.dispatch(statusLanesAction.updateStatusLaneName(this.statusLaneId, name));
    }

}