import { combineReducers } from 'redux';
import bords from './bords';
import { lists } from './lists';
import cards from './cards';
import cardModals from './cardModals';
import statuses from './statuses';

const rootReducer = combineReducers({
    bords,
    lists,
    cards,
    cardModals,
    statuses,
});

export default rootReducer;
