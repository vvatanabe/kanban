import ActionType from '../constants/actionType';
import Action from '../actions/action';
import { EditCardModal, Card } from '../models';
import { createReducer } from './createReducer';

// const defaultState = {
//   isOpen: false,
//   cardId: '',
//   users: [],
//   editable: {
//     isSummary: false,
//     isDescription: false,
//     isAssignee: false,
//     isStartDate: false,
//     isEndDate: false,
//     isEstimatedHours: false,
//     isActualHours: false,
//   }
// } as EditCardModal;


function showModal(state: EditCardModal, action: Action<EditCardModal>): EditCardModal {
    return Object.assign({}, state, action.payload) as EditCardModal;
}

function hideModal(state: EditCardModal, action: Action<EditCardModal>): EditCardModal {
    return Object.assign({}, state, action.payload) as EditCardModal;
}

function showModalForm(state: EditCardModal, action: Action<EditCardModal>): EditCardModal {
    return Object.assign({}, state, {
        editableForm: action.payload.editableForm
    }) as EditCardModal;
}

function hideModalForm(state: EditCardModal, action: Action<EditCardModal>): EditCardModal {
    return Object.assign({}, state, {
        editableForm: action.payload.editableForm
    }) as EditCardModal;
}

const modal = createReducer<EditCardModal, EditCardModal>({} as EditCardModal, {
    // [ActionType.ShowModal]: showModal,
    // [ActionType.HideModal]: hideModal,
    // [ActionType.ShowModalForm]: showModalForm,
    // [ActionType.HideModalForm]: hideModalForm,
});

export default modal;
