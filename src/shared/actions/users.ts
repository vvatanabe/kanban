import * as uuid from 'uuid';
import Action from './action';
import ActionType from '../constants/actionType';
import { User } from '../models';

export const addUser = (name: string, icon: string): Action<User> => ({
    type: ActionType.AddUser,
    payload: {
        id: uuid.v4(),
        name,
        icon
    } as User
});

export const deleteUser = (id: string): Action<User> => ({
    type: ActionType.DeleteUser,
    payload: {
        id
    } as User
});
