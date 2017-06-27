import * as Redux from 'redux';
import * as cardModalsAction from '../../shared/actions/cardModals';
import {Action, BoardId, CardId} from '../../shared/models';


export default class CardModalDispatcher {
    
    constructor(private dispatch: Redux.Dispatch<Action<any>>){}
    
    public openCardModal(boardId: BoardId, cardId: CardId) {
        this.dispatch(cardModalsAction.open(boardId, cardId))
    }

}