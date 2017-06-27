import * as Redux from 'redux';
import * as cardsAction from '../../shared/actions/cards';
import {Action, BoardId, CardId} from '../../shared/models';


export default class CardDispatcher {
    
    constructor(private dispatch: Redux.Dispatch<Action<any>>){}
    
    public openCardModal(boardId: BoardId, cardId: CardId) {
        this.dispatch(cardModalsAction.open(boardId, cardId))
    }

}