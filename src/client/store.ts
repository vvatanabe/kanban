import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../shared/reducers';

const ReduxShareClient = require('redux-share-client');

declare var window: any;
declare var WS_HOST: string;

var client = new ReduxShareClient(WS_HOST, {
	debug: true,
	autoReconnectMaxTries: 10, 
	autoReconnectDelay: 100
});

const configStore = (initialState = {}) => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(client.getReduxMiddleware())
  )
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
export default configStore;
