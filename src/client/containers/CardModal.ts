import * as Redux from 'redux';
import { connect } from 'react-redux';
import { default as CardModal, CardModalProps, CardModalStateProps, CardModalDispatchProps } from '../components/CardModal';
import Action from '../../shared/actions/action';
import * as cardsActions from '../../shared/actions/cards';
import * as modalsActions from '../../shared/actions/modals';
import { AppState, List, Card, Form } from '../../shared/models';
import { ItemType, Item } from '../../shared/constants/itemType';
import * as moment from 'moment';
import * as Select from 'react-select';

const mapStateToProps = (state: AppState, ownProps: CardModalProps): CardModalStateProps => {
  const card = state.cards.filter(card => card.id === ownProps.cardId)[0];
  return {
    summaryForm: new Form<string>(card.summary, ownProps.editable.isSummary),
    descriptionForm: new Form<string>(card.description, ownProps.editable.isDescription),
    assigneeForm: new Form<string>(card.assignee, ownProps.editable.isAssignee),
    startDateForm: new Form<string>(card.startDate, ownProps.editable.isStartDate),
    endDateForm: new Form<string>(card.dueDate, ownProps.editable.isEndDate),
    estimatedHoursForm: new Form<number>(card.estimatedHours, ownProps.editable.isEstimatedHours),
    actualHoursForm: new Form<number>(card.actualHours, ownProps.editable.isActualHours),
    pointForm: new Form<number>(card.point, ownProps.editable.isPoint),
    users: []
  } as CardModalStateProps
};

const mapDispatchToProps = <T>(dispatch: Redux.Dispatch<Action<T>>, ownProps: CardModalProps): CardModalDispatchProps => ({
    close: () => {
      dispatch(modalsActions.hideModal(ownProps.bordId));
    },
    onEditSummary() {
        dispatch(modalsActions.showSummaryForm(ownProps.bordId, ownProps.cardId));
    },
    onUpdateSummary(cardId: string, summary: string) {
        // TODO change multiple dispatcher.
        dispatch(cardsActions.updateCard({
            id: cardId,
            editing: false,
            summary
        } as Card));
        dispatch(modalsActions.hideAllForm(ownProps.bordId, cardId));
    },
    onEditDescription() {
        dispatch(modalsActions.showDescriptionForm(ownProps.bordId, ownProps.cardId));
    },
    onUpdateDescription(cardId: string, description: string) {
        // TODO change multiple dispatcher.
        dispatch(cardsActions.updateCard({
            id: cardId,
            editing: false,
            description
        } as Card));
        dispatch(modalsActions.hideAllForm(ownProps.bordId, cardId));
    },
    onEditAssignee() {
        dispatch(modalsActions.showAssigneeForm(ownProps.bordId, ownProps.cardId));
    },
    onUpdateAssignee(cardId: string, option: Select.Option) {
        // TODO not implements here
        const assignee = ownProps.users.filter(user => `${user.id}` === option.value)[0];
        const updateCard = {
            id: cardId,
            editing: false,
        } as Card;
        // TODO change multiple dispatcher.
        dispatch(cardsActions.updateCard(updateCard));
        dispatch(modalsActions.hideAllForm(ownProps.bordId, cardId));
    },
    onEditStartDate() {
        dispatch(modalsActions.showStartDateForm(ownProps.bordId, ownProps.cardId));
    },
    onUpdateStartDate(cardId: string, startDate: string) {
        const updateCard = {
            id: cardId,
            editing: false,
            startDate
        } as Card;
        // TODO change multiple dispatcher.
        dispatch(cardsActions.updateCard(updateCard));
        dispatch(modalsActions.hideAllForm(ownProps.bordId, cardId));
    },
    onEditEndDate() {
        dispatch(modalsActions.showEndDateForm(ownProps.bordId, ownProps.cardId));
    },
    onUpdateEndDate(cardId: string, dueDate: string) {
        const updateCard = {
            id: cardId,
            editing: false,
            dueDate
        } as Card;
        // TODO change multiple dispatcher.
        dispatch(cardsActions.updateCard(updateCard));
        dispatch(modalsActions.hideAllForm(ownProps.bordId, cardId));
    },
    onEditEstimatedHours() {
        dispatch(modalsActions.showEstimatedHoursForm(ownProps.bordId, ownProps.cardId));
    },
    onUpdateEstimatedHours(cardId: string, estimatedHours: string) {
        const updateCard = {
            id: cardId,
            editing: false,
            estimatedHours: parseInt(estimatedHours)
        } as Card;
        // TODO change multiple dispatcher.
        dispatch(cardsActions.updateCard(updateCard));
        dispatch(modalsActions.hideAllForm(ownProps.bordId, cardId));
    },
    onEditActualHours() {
        dispatch(modalsActions.showActualHoursForm(ownProps.bordId, ownProps.cardId));
    },
    onUpdateActualHours(cardId: string, actualHours: string) {
        const updateCard = {
            id: cardId,
            editing: false,
            actualHours: parseInt(actualHours)
        } as Card;
        // TODO change multiple dispatcher.
        dispatch(cardsActions.updateCard(updateCard));
        dispatch(modalsActions.hideAllForm(ownProps.bordId, cardId));
    },
    onEditPoint() {
        // TODO
    },
    onUpdatePoint(cardId: string, point: string) {
        const updateCard = {
            id: cardId,
            editing: false,
            point: parseInt(point)
        } as Card;
        // TODO change multiple dispatcher.
        dispatch(cardsActions.updateCard(updateCard));
        dispatch(modalsActions.hideAllForm(ownProps.bordId, cardId));
    }
});

export default connect<CardModalStateProps, CardModalDispatchProps, CardModalProps>(
    mapStateToProps,
    mapDispatchToProps
)(CardModal);
