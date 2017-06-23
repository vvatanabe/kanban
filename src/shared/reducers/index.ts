import { combineReducers } from 'redux';
import bords from './bords';
import { lists } from './lists';
import cards from './cards';
import statuses from './statuses';

export default combineReducers({
    bords,
    lists,
    cards,
    statuses
});
