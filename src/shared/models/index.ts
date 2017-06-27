
export interface AppState {
  bords: Bord[];
  scrumBoards: ScrumBoard[];
  lists: List[];
  storylanes: StoryLane[];
  statusLanes: StatusLane[];
  cards: Card[];
  users: User[];
  statuses: Status[];
}

export interface Status {
  id: string;
  name: string;
}

export interface Bord {
  id: string;
  name: string;
  listIds: string[];
  cardModal: EditCardModal;
  editing?: boolean;
}

export interface ScrumBoard {
  id: string;
  name: string;
  storyLaneIds: string[];
  cardModal: EditCardModal;
  editingName?: boolean;
}

export interface StoryLane {
  id: string;
  cardId: string;
  statusLaneIds: string[];
  editing: boolean;  
}

export interface StatusLane {
  id: string;
  statusId: string;
  cardIds: string[]; 
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
  assignee: string;
  startDate: string;
  dueDate: string;
  estimatedHours: number;
  actualHours: number;
  point: number;
  statusId: string;
  parentId?: string;
  childIds: string[];
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

export interface StoryLaneMovePosition {
  bordId: string;
  sourceLaneId: string;
  targetLaneId: string;
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

export interface CardParentChildRelation {
  parentId: string;
  childId: string;
}