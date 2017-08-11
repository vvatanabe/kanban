import ActionType from '../constants/actionType';
import Action from '../actions/action';
import Statuses from '../constants/status';
import { Status } from '../models';
import { createReducer } from './createReducer';
import * as uuid from 'uuid';

const addStatus = (state: Status[], action: Action<Status>): Status[] => (
  state.concat(action.payload)
)

const updateStatus = (state: Status[], action: Action<Status>): Status[] => (
  state.map(status => (
    status.id === action.payload.id ? Object.assign({}, status, action.payload) : status)
  )
)

const deleteStatus = (state: Status[], action: Action<Status>): Status[] => (
  state.filter(status => status.id !== action.payload.id)
)

const statuses = createReducer<Status[]>([
  {
    id: "097c42e1-d15f-4edf-a098-21ea10f1ab14",
    name: "Open",
  },
  {
    id: "fff8d375-5600-4ecc-9dfc-ff59e656a458",
    name: "In Progress",
  },
  {
    id: "38feef6e-b11c-4a77-b323-1a1aa941be97",
    name: "Resolved",
  },
  {
    id: "b167ab43-a641-4937-aa60-ecabfe348b43",
    name: "Closed",
  }
], {

});

export default statuses;
