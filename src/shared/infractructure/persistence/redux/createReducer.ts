import Action from "./Action";

export const createReducer = <T>(initialState: T, handlers: Handlers<T>): Reducer<T> => (
  (state = initialState, action: Action<any>) => {
    if (handlers.hasOwnProperty(`${action.type}`)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  }
);

export interface Handlers<T> {
  [index: string]: Reducer<T>;
}

export type Reducer<T> = (state: T, action: Action<any>) => T;
