import ActionType from '../constants/actionType';
import Action from '../actions/action';
import { Bord, BordOperator, Mover, ListMovePosition, EditCardModalOnBord } from '../models';
import { createReducer } from './createReducer';
import update = require('react-addons-update');

const addBord = (state: Bord[], action: Action<Bord>): Bord[] => (
  state.concat(action.payload)
)

const deleteBord = (state: Bord[], action: Action<Bord>): Bord[] => (
  state.filter(bord => bord.id !== action.payload.id)
)

const updateBord = (state: Bord[], action: Action<Bord>): Bord[] => (
  state.map(bord => (
    bord.id === action.payload.id ? Object.assign({}, bord, action.payload) : bord)
  ) 
)

const attachToBord = (state: Bord[], action: Action<BordOperator>): Bord[] => {
  const { bordId, listId } = action.payload;
  return state.map(bord => {
    if(!!~bord.listIds.indexOf(listId)) {
      // 移動するリストを元の位置から排除する
      return Object.assign({}, bord, {
        listIds: bord.listIds.filter(id => id !== listId),
      });
    }
    if(bord.id === bordId) {
      // 移動するリストを指定の位置へ移動する
      return Object.assign({}, bord, {
        listIds: bord.listIds.concat(listId),
      });
    }
    return bord;
  });
}

const detachFromBord = (state: Bord[], action: Action<BordOperator>): Bord[] => {
  const { bordId, listId } = action.payload;
  return state.map(bord => {
    if(bord.id === bordId) {
      return Object.assign({}, bord, {
        listIds: bord.listIds.filter(id => id !== listId),
      });
    }
    return bord;
  });
}

// TODO リファクタ
const moveList = (state: Bord[], action: Action<ListMovePosition>): Bord[] => {
  var { bordId, sourceListId, targetListId } = action.payload;

  const bord = state.filter(bord => bord.id === bordId)[0];

  sourceListId = bord.listIds.filter(listId => listId === sourceListId)[0];
  
  const sourceListIdIndex = bord.listIds.reduce((result, listId, index) => {
    if (listId === sourceListId) {
      result = index;
    }
    return result;
  }, -1);
  const targetListIdIndex = bord.listIds.reduce((result, listId, index) => {
    if (listId === targetListId) {
      result = index;
    }
    return result;
  }, -1);
  const updatedBord = update(bord, {
    listIds: {
      $splice: [
        [sourceListIdIndex, 1], // 対象を <元の位置> から <削除>
        [targetListIdIndex, 0, sourceListId] // 対象を <移動先の位置> へ <追加>
      ],
    }
  });
  return state.map(bord => {
    if (bord.id === bordId) {
      return updatedBord;
    }
    return bord;
  });
}

function updateModal(state: Bord[], action: Action<EditCardModalOnBord>): Bord[] {
    return state.map(bord => {
      if (bord.id === action.payload.bordId) {
        return Object.assign({}, bord, {
          cardModal: action.payload
        });
      }
      return bord;
    });
}

function updateModalForm(state: Bord[], action: Action<EditCardModalOnBord>): Bord[] {
    return state.map(bord => {
      if (bord.id === action.payload.bordId) {
        return Object.assign({}, bord, {
          cardModal: {
            cardId: action.payload.cardId,
            isOpen: action.payload.isOpen,
            editableForm: action.payload.editableForm
          }
        });
      }
      return bord;
    });
}

const bords = createReducer<Bord[], any>([], {
  [ActionType.AddBord]: addBord,
  [ActionType.DeleteBord]: deleteBord,
  [ActionType.AttachToBord]: attachToBord,
  [ActionType.DetachFromBord]: detachFromBord,
  [ActionType.OpenBordNameEditer]: updateBord,
  [ActionType.UpdateBordName]: updateBord,
  [ActionType.MoveList]: moveList,
  [ActionType.ShowModal]: updateModal,
  [ActionType.HideModal]: updateModal,
  [ActionType.ShowModalForm]: updateModalForm,
  [ActionType.HideModalForm]: updateModalForm
});

export default bords;
