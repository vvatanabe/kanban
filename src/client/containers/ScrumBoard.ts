import * as Redux from 'redux';
import { connect } from 'react-redux';
import { default as Bord, ScrumBoardProps, ScrumBoardStateProps, ScrumBoardDispatchProps } from '../components/ScrumBoard';
import Action from '../../shared/actions/action';
import * as listsActions from '../../shared/actions/lists';
import * as storyLanesActions from '../../shared/actions/storyLanes';
import * as cardsActions from '../../shared/actions/cards';
import * as modalsActions from '../../shared/actions/modals';
import * as bordsActions from '../../shared/actions/bords';
import * as usersActions from '../../shared/actions/users';
import { AppState, List, Card } from '../../shared/models';
import { ItemType, Item } from '../../shared/constants/itemType';

const mapStateToProps = (state: AppState, ownProps: ScrumBoardProps): ScrumBoardStateProps => {
  const ownBord = state.scrumBoards.filter(bord => bord.id == ownProps.match.params.bordId)[0];
  return {
    bord: ownBord,
    isOpenCardModal: false
  };
};

const mapDispatchToProps = <T>(dispatch: Redux.Dispatch<Action<T>>, ownProps: ScrumBoardProps): ScrumBoardDispatchProps => ({
    showCardModal: (cardId: string) => {
        dispatch(modalsActions.showModal(ownProps.match.params.bordId, cardId, []));
    },
    createStoryLane: (bordId: string) => {
        const createCardAct = cardsActions.createCard();
        const createStoryLanesAct = storyLanesActions.create(createCardAct.payload.id, ownProps.bord.storyLaneIds);
        const boardOperator = bordsActions.attachStoryLaneToScrumBoard(bordId, createStoryLanesAct.payload.id);
        dispatch(createCardAct);
        dispatch(createStoryLanesAct);
        dispatch(bordOperator);
    },
    // TODO リファクタ
    onEditList: (listId: string, name: string) => {
        const updateList = {
            id: listId,
            editing: name ? false : true
        } as List;
        if (name) {
            updateList.name = name;
        }
        dispatch(listsActions.updateList(updateList))
    },
    onDeleteList: (bordId: string, listId: string) => {
        dispatch(bordsActions.detachFromBord(bordId, listId));
        dispatch(listsActions.deleteList(listId));
    },
    onMoveList: (sourceId: string, targetId: string) => {
        dispatch(bordsActions.moveList(ownProps.match.params.bordId, sourceId, targetId))
    },
    onAddUser: (name: string, icon: string) => {
        dispatch(usersActions.addUser(name, icon))
    }
});

export default connect<BordStateProps, BordDispatchProps, BordProps>(
    mapStateToProps,
    mapDispatchToProps
)(Bord);
