import * as Redux from 'redux';
import { connect } from 'react-redux';
import { default as List, ListProps, ListStateProps, ListDispatchProps } from '../components/List';
import Action from '../../shared/actions/action';
import * as listsActions from '../../shared/actions/lists';
import * as cardsActions from '../../shared/actions/cards';
import { AppState, Card } from '../../shared/models';
import { Item } from '../../shared/constants/itemType';

const mapStateToProps = (state: AppState, ownProps: ListProps): ListStateProps => {
    const ownList = state.lists.filter(list => list.id === ownProps.id)[0];
    return {
        list: ownList
    } as ListStateProps;
};

const mapDispatchToProps = <T>(dispatch: Redux.Dispatch<Action<T>>, ownProps: ListProps): ListDispatchProps => ({
    onCreateCard: (listId: string) => {
        const newCard = cardsActions.createCard();
        const list = listsActions.attachToList(listId, newCard.payload.id);
        dispatch(newCard);
        dispatch(list);
    },
    // TODO リファクタ
    onDeleteCard: (listId: string, cardId: string) => {
        dispatch(cardsActions.deleteCard(cardId));
        if (listId) {
            dispatch(listsActions.detachFromList(listId, cardId));
        }
    },
    // TODO リファクタ
    onEditCard: (cardId: string) => {
        dispatch(cardsActions.editCard(cardId));
    },
    // TODO リファクタ
    onUpdateCard: (cardId: string, value: string) => {
        const updateCard = {
            id: cardId,
            editing: false,
            summary: value
        } as Card;
        dispatch(cardsActions.updateCard(updateCard));
    },
    onMoveCard: (sourceId: string, targetId: string) => {
        dispatch(listsActions.moveCard(ownProps.id, sourceId, targetId));
    },
    attachToList: (targetId: string, sourceId: string) => {
        dispatch(listsActions.attachToList(targetId, sourceId));
    }
});

export default connect<ListStateProps, ListDispatchProps, ListProps>(
    mapStateToProps,
    mapDispatchToProps
)(List);
