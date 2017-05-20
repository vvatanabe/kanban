import ActionType from '../constants/actionType';
import Action from '../actions/action';
import { Card } from '../models';
import { createReducer } from './createReducer';


const createCard = (state: Card[], action: Action<Card>): Card[] => (
  state.concat(action.payload)
)

const editCard = (state: Card[], action: Action<Card>): Card[] => (
  state.map(card => (
    card.id === action.payload.id ? Object.assign({}, card, action.payload) : card)
  )
)

const updateCard = (state: Card[], action: Action<Card>): Card[] => (
  state.map(card => (
    card.id === action.payload.id ? Object.assign({}, card, action.payload) : card)
  )
)
const deleteCard = (state: Card[], action: Action<Card>): Card[] => (
  state.filter(card => card.id !== action.payload.id)
)

const cards = createReducer<Card[], Card>([], {
  [ActionType.CreateCard]: createCard,
  [ActionType.EditCard]: editCard,
  [ActionType.UpdateCard]: updateCard,
  [ActionType.DeleteCard]: deleteCard
});

export default cards;
