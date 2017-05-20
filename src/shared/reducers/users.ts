import ActionType from '../constants/actionType';
import Action from '../actions/action';
import { User } from '../models';
import { createReducer } from './createReducer';


const addUser = (state: User[], action: Action<User>): User[] => (
  state.concat(action.payload)
)

const deleteUser = (state: User[], action: Action<User>): User[] => (
  state.filter(user => user.id !== action.payload.id)
)

const cards = createReducer<User[], User>([], {
  [ActionType.AddUser]: addUser,
  [ActionType.DeleteUser]: deleteUser
});

export default cards;
