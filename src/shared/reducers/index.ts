import { combineReducers } from 'redux';
import bords from './bords';
import { lists } from './lists';
import cards from './cards';
import modal from './modal';

export default combineReducers({
    bords,
    lists,
    cards
});
