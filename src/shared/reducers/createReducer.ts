import Action from '../actions/action';

export const createReducer = <T, U>(initialState: T, handlers: Handlers<T, U>): Reducer<T, U> => (
  (state = initialState, action: Action<U>) => {
    if (handlers.hasOwnProperty(`${action.type}`)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  }
)

export interface Handlers<T, U> {
	[index: string]: Reducer<T, U>;
}

export type Reducer<T, U> = (state: T, action: Action<U>) => T;
