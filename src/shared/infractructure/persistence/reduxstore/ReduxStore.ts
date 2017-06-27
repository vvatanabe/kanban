import { List } from "immutable";
import { applyMiddleware, compose, createStore, Store } from "redux";
import AppState from "../../../domain/model/AppState";
import rootReducer from "./rootReducer";

const ReduxShareClient = require("redux-share-client");

declare var window: any;
declare var WS_HOST: string;

const client = new ReduxShareClient(WS_HOST, {
  debug: true,
  autoReconnectMaxTries: 10,
  autoReconnectDelay: 100,
});

abstract class AbstractTaskBoardStore {

}

class TaskBoardStore extends AbstractTaskBoardStore {
  constructor() {
    super();
  }
}

const configStore = (initialState = {
  boards: List.of(),
  storyLanes: List.of(),
  statusLanes: List.of(),
  cards: List.of(),
  statuses: List.of(),
} as AppState) => {
  const store: Store<AppState> = createStore<AppState>(
    rootReducer,
    initialState,
    applyMiddleware(client.getReduxMiddleware()),
  );
  store.dispatch({ type: "@@SYNC-CONNECT-SERVER-START" });
  return store;
};

// const configStore = (initialState = {}) => {
//   return createStore(
//     rootReducer,
//     initialState,
//     compose<any>(
//       window.devToolsExtension ? window.devToolsExtension() : f => f
//     )
//   )
// };

const store = configStore();

export default store;
export const dispatch = store.dispatch;
export const getState = store.getState;
