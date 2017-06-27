import ActionType from '../constants/ActionType';
import { Action, BoardId, CardModal, CardId } from '../models';

interface OpenCardModalAction extends Action<{ boardId: BoardId, cardId: CardId }> { }

export const openCardModal = (boardId: BoardId, cardId: CardId): OpenCardModalAction => ({
    type: ActionType.OpenCardModal,
    payload: { boardId, cardId },
});

export const close = (boardId: BoardId): Action<BoardId> => ({
    type: ActionType.CloseCardModal,
    payload: boardId
});

export const hideAllForms = (boardId: BoardId, cardId: CardId): Action<[BoardId, CardModal]> => ({
    type: ActionType.HideAllFormsInCardModal,
    payload: [boardId, CardModal.create({ cardId })]
});

export const showSummaryForm = (boardId: BoardId, cardId: CardId): Action<[BoardId, CardModal]> => ({
    type: ActionType.ShowFormInCardModal,
    payload: [boardId, CardModal.create({ cardId, showSummaryForm: true })]
});

export const showDescriptionForm = (boardId: BoardId, cardId: CardId): Action<[BoardId, CardModal]> => ({
    type: ActionType.ShowFormInCardModal,
    payload: [boardId, CardModal.create({ cardId, showDescriptionForm: true })]
});

export const showAssigneeForm = (boardId: BoardId, cardId: CardId): Action<[BoardId, CardModal]> => ({
    type: ActionType.ShowFormInCardModal,
    payload: [boardId, CardModal.create({ cardId, showAssigneeForm: true })]
});

export const showStartDateForm = (boardId: BoardId, cardId: CardId): Action<[BoardId, CardModal]> => ({
    type: ActionType.ShowFormInCardModal,
    payload: [boardId, CardModal.create({ cardId, showStartDateForm: true })]
});

export const showDueDateForm = (boardId: BoardId, cardId: CardId): Action<[BoardId, CardModal]> => ({
    type: ActionType.ShowFormInCardModal,
    payload: [boardId, CardModal.create({ cardId, showDueDateForm: true })]
});

export const showEstimatedHoursForm = (boardId: BoardId, cardId: CardId): Action<[BoardId, CardModal]> => ({
    type: ActionType.ShowFormInCardModal,
    payload: [boardId, CardModal.create({ cardId, showEstimatedHoursForm: true })]
});

export const showActualHoursForm = (boardId: BoardId, cardId: CardId): Action<[BoardId, CardModal]> => ({
    type: ActionType.ShowFormInCardModal,
    payload: [boardId, CardModal.create({ cardId, showActualHoursForm: true })]
});

export const showPointForm = (boardId: BoardId, cardId: CardId): Action<[BoardId, CardModal]> => ({
    type: ActionType.ShowFormInCardModal,
    payload: [boardId, CardModal.create({ cardId, showPointForm: true })]
});

import ActionType from '../constants/ActionType';
import { Action, Board, BoardId, Card, CardId, CardModal, Identifier } from '../models';
import { createReducer, immutableUpdate } from './createReducer';

const open = (state: Board[], action: Action<{ boardId: BoardId, cardId: CardId }>): Board[] => (
    immutableUpdate(state, {
        id: action.payload.boardId,
        cardModal: CardModal.create({ cardId: action.payload.cardId })
    } as Board)
)

const close = (state: Board[], action: Action<BoardId>): Board[] => (
    immutableUpdate(state, {
        id: action.payload
    } as Board)
)

const updateDisplay = (state: Board[], action: Action<{ boardId: BoardId, cardModal: CardModal }>): Board[] => (
    immutableUpdate(state, {
        id: action.payload.boardId,
        cardModal: action.payload.cardModal
    } as Board)
)

const cardModals = createReducer<Board[]>([], {
    [ActionType.OpenCardModal]: open,
    [ActionType.CloseCardModal]: close,
    [ActionType.ShowFormInCardModal]: updateDisplay,
    [ActionType.HideAllFormsInCardModal]: updateDisplay
})

export default cardModals;