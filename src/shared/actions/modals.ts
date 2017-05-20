import * as uuid from 'uuid';
import Action from './action';
import ActionType from '../constants/actionType';
import { EditCardModalOnBord, Card, User } from '../models';

export const showModal = (bordId: string, cardId: string, userIds: string[]): Action<EditCardModalOnBord> => ({
    type: ActionType.ShowModal,
    payload: {
        bordId: bordId,
        isOpen: true,
        editableForm: {
            isSummary: false,
            isDescription: false,
            isAssignee: false,
            isStartDate: false,
            isEndDate: false,
            isEstimatedHours: false,
            isActualHours: false,
            isPoint: false
        },
        cardId: cardId
    }
});

export const hideModal = (bordId: string): Action<EditCardModalOnBord> => ({
    type: ActionType.HideModal,
    payload: {
        bordId: bordId,
        isOpen: false,
        editableForm: {
            isSummary: false,
            isDescription: false,
            isAssignee: false,
            isStartDate: false,
            isEndDate: false,
            isEstimatedHours: false,
            isActualHours: false,
            isPoint: false
        }
    }
});

export const hideAllForm = (bordId: string, cardId: string): Action<EditCardModalOnBord> => ({
    type: ActionType.HideModalForm,
    payload: {
        bordId: bordId,
        isOpen: true,
        editableForm: {
            isSummary: false,
            isDescription: false,
            isAssignee: false,
            isStartDate: false,
            isEndDate: false,
            isEstimatedHours: false,
            isActualHours: false,
            isPoint: false
        },
        cardId: cardId
    }
});

export const showSummaryForm = (bordId: string, cardId: string): Action<EditCardModalOnBord> => ({
    type: ActionType.ShowModalForm,
    payload: {
        bordId: bordId,
        isOpen: true,
        editableForm: {
            isSummary: true,
            isDescription: false,
            isAssignee: false,
            isStartDate: false,
            isEndDate: false,
            isEstimatedHours: false,
            isActualHours: false,
            isPoint: false
        },
        cardId: cardId
    }
});

export const showDescriptionForm = (bordId: string, cardId: string): Action<EditCardModalOnBord> => ({
    type: ActionType.ShowModalForm,
    payload: {
        bordId: bordId,
        isOpen: true,
        editableForm: {
            isSummary: false,
            isDescription: true,
            isAssignee: false,
            isStartDate: false,
            isEndDate: false,
            isEstimatedHours: false,
            isActualHours: false,
            isPoint: false
        },
        cardId: cardId
    }
});

export const showAssigneeForm = (bordId: string, cardId: string): Action<EditCardModalOnBord> => ({
    type: ActionType.ShowModalForm,
    payload: {
        bordId: bordId,
        isOpen: true,
        editableForm: {
            isSummary: false,
            isDescription: false,
            isAssignee: true,
            isStartDate: false,
            isEndDate: false,
            isEstimatedHours: false,
            isActualHours: false,
            isPoint: false
        },
        cardId: cardId
    }
});

export const showStartDateForm = (bordId: string, cardId: string): Action<EditCardModalOnBord> => ({
    type: ActionType.ShowModalForm,
    payload: {
        bordId: bordId,
        isOpen: true,
        editableForm: {
            isSummary: false,
            isDescription: false,
            isAssignee: false,
            isStartDate: true,
            isEndDate: false,
            isEstimatedHours: false,
            isActualHours: false,
            isPoint: false
        },
        cardId: cardId
    }
});

export const showEndDateForm = (bordId: string, cardId: string): Action<EditCardModalOnBord> => ({
    type: ActionType.ShowModalForm,
    payload: {
        bordId: bordId,
        isOpen: true,
        editableForm: {
            isSummary: false,
            isDescription: false,
            isAssignee: false,
            isStartDate: false,
            isEndDate: true,
            isEstimatedHours: false,
            isActualHours: false,
            isPoint: false
        },
        cardId: cardId
    }
});

export const showEstimatedHoursForm = (bordId: string, cardId: string): Action<EditCardModalOnBord> => ({
    type: ActionType.ShowModalForm,
    payload: {
        bordId: bordId,
        isOpen: true,
        editableForm: {
            isSummary: false,
            isDescription: false,
            isAssignee: false,
            isStartDate: false,
            isEndDate: false,
            isEstimatedHours: true,
            isActualHours: false,
            isPoint: false
        },
        cardId: cardId
    }
});

export const showActualHoursForm = (bordId: string, cardId: string): Action<EditCardModalOnBord> => ({
    type: ActionType.ShowModalForm,
    payload: {
        bordId: bordId,
        isOpen: true,
        editableForm: {
            isSummary: false,
            isDescription: false,
            isAssignee: false,
            isStartDate: false,
            isEndDate: false,
            isEstimatedHours: false,
            isActualHours: true,
            isPoint: false
        },
        cardId: cardId
    }
});

export const showPointForm = (bordId: string, cardId: string): Action<EditCardModalOnBord> => ({
    type: ActionType.ShowModalForm,
    payload: {
        bordId: bordId,
        isOpen: true,
        editableForm: {
            isSummary: false,
            isDescription: false,
            isAssignee: false,
            isStartDate: false,
            isEndDate: false,
            isEstimatedHours: false,
            isActualHours: false,
            isPoint: true
        },
        cardId: cardId
    }
});