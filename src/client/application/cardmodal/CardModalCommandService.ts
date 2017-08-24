import * as Redux from 'redux';
import * as cardModalsAction from '../../shared/actions/cardModals';
import { Action, BoardId, CardId } from '../../shared/models';


class CardModalCommandService {

    constructor(private dispatch: Redux.Dispatch<Action<any>>) { }

    public openCardModal(boardId: BoardId, cardId: CardId) {
        this.dispatch(cardModalsAction.open(boardId, cardId))
    }

}