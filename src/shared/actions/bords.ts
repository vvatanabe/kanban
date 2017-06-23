import * as uuid from 'uuid';
import Action from './action';
import ActionType from '../constants/actionType';
import { Bord, BordOperator, EditCardModal, EditableForm, ListMovePosition } from '../models';

export const addBord = (): Action<Bord> => ({
    type: ActionType.AddBord,
    payload: {
        id: uuid.v4(),
        name: "New Bord",
        listIds: [],
        statusIds: [],
        cardModal: {
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
    }
});

export const deleteBord = (id: string): Action<Bord> => ({
    type: ActionType.DeleteBord,
    payload: {
      id
    } as Bord
});

export const attachToBord = (bordId: string, listId: string): Action<BordOperator> => ({
    type: ActionType.AttachToBord,
    payload: {
        bordId,
        listId,
    } as BordOperator
});

export const detachFromBord = (bordId: string, listId: string): Action<BordOperator> => ({
    type: ActionType.DetachFromBord,
    payload: {
        bordId,
        listId,
    } as BordOperator
});

export const openBordNameEditer = (bordId: string): Action<Bord> => ({
    type: ActionType.OpenBordNameEditer,
    payload: {
      id: bordId,
      editing: true
    } as Bord
});

export const updateBordName = (bordId: string, bordName: string): Action<Bord> => ({
    type: ActionType.UpdateBordName,
    payload: {
      id: bordId,
      name: bordName,
      editing: false
    } as Bord
});

export const moveList = (bordId: string, sourceListId: string, targetListId: string): Action<ListMovePosition> => ({
    type: ActionType.MoveList,
    payload: {
        bordId: bordId,
        sourceListId: sourceListId,
        targetListId: targetListId
    } as ListMovePosition
});