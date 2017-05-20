
export interface AppState {
  bords: Bord[];
  lists: List[];
  cards: Card[];
  users: User[];
}

export interface Bord {
  id: string;
  name: string;
  listIds: string[];
  cardModal: EditCardModal;
  editing?: boolean;
}

export interface List {
  id: string;
  name: string;
  cardIds: string[];
  editing: boolean;
}

export interface Card {
  id: string;
  summary: string;
  description: string;
  assignee: string,
  startDate: string,
  dueDate: string,
  estimatedHours: number,
  actualHours: number,
  point: number,
  editing: boolean;
}

export type EditCardModalOnBord = { bordId: string } & EditCardModal;

export interface EditCardModal {
  isOpen: boolean;
  editableForm: EditableForm;
  cardId?: string;
}

export interface EditableForm {
  isSummary: boolean;
  isDescription: boolean;
  isAssignee: boolean;
  isStartDate: boolean;
  isEndDate: boolean;
  isEstimatedHours: boolean,
  isActualHours: boolean,
  isPoint: boolean,
}

export function createEditable({
    isSummary = false,
    isDescription = false,
    isAssignee = false,
    isStartDate = false,
    isEndDate = false,
    isEstimatedHours = false,
    isActualHours = false,
    isPoint = false
  }): EditableForm {
    return {
      isSummary,
      isDescription,
      isAssignee,
      isStartDate,
      isEndDate,
      isEstimatedHours,
      isActualHours,
      isPoint
    }
}

export class Form<T> {
  constructor(public value: T, public isOpen: boolean) {}
}

export interface User {
  id: string;
  name: string;
  icon: string;
}

export interface Operator {
  listId: string;
  cardId: string;
}

export interface BordOperator {
  bordId: string;
  listId: string;
}

export interface Mover {
  sourceId: string;
  targetId: string;
}

export interface ListMovePosition {
  bordId: string;
  sourceListId: string;
  targetListId: string;
}

export interface CardMovePosition {
  listId: string;
  sourceCardId: string;
  targetCardId: string;
}