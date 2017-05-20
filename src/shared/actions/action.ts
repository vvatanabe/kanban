import ActionType from '../constants/actionType';

interface Action<T> {
    type: ActionType;
    payload: T;
}

export default Action;
