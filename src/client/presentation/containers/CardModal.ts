import * as Redux from 'redux';
import { connect } from 'react-redux';
import * as Select from 'react-select';
import * as moment from 'moment';
import { default as CardModal, StateProps, DispatchProps, MergeProps, OwnProps } from '../components/CardModal';
import * as cardsActions from '../../shared/actions/cards';
import * as cardModalsActions from '../../shared/actions/cardModals';
import { Action, AppState, Form, Card, Identifier } from '../../shared/models';

interface CardModalContents {

}

class CardModalQueryService {

    constructor(readonly store: any) { }

    public viewCardModal = (cardId: CardId, boardId: BoardId) => {
        const card = this.store.cards.find(card => card.id.equals(cardId));
        const board = this.store.boards.find(board => board.id.equals(boardId));
        return {
            summary: Form.create(card.summary, ownProps.data.showSummaryForm),
            description: Form.create(card.description, ownProps.data.showDescriptionForm),
            startDate: Form.create(card.startDate, ownProps.data.showStartDateForm),
            dueDate: Form.create(card.dueDate, ownProps.data.showDueDateForm),
            estimatedHours: Form.create(card.estimatedHours, ownProps.data.showEstimatedHoursForm),
            actualHours: Form.create(card.actualHours, ownProps.data.showActualHoursForm),
            point: Form.create(card.point, ownProps.data.showPointForm),
        }

    }
}

const cardModalQueryService = new CardModalQueryService({});


const bindStateToProps = (ownProps: OwnProps): StateProps => {
    const card = cardModalQueryService.viewCardModal(ownProps.cardId);
    return {
        summary: Form.create(card.summary, ownProps.data.showSummaryForm),
        description: Form.create(card.description, ownProps.data.showDescriptionForm),
        startDate: Form.create(card.startDate, ownProps.data.showStartDateForm),
        dueDate: Form.create(card.dueDate, ownProps.data.showDueDateForm),
        estimatedHours: Form.create(card.estimatedHours, ownProps.data.showEstimatedHoursForm),
        actualHours: Form.create(card.actualHours, ownProps.data.showActualHoursForm),
        point: Form.create(card.point, ownProps.data.showPointForm),
    }
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<Action<any>>, ownProps: OwnProps): DispatchProps => {
    const boardId = ownProps.boardId;
    const cardId = ownProps.data.cardId;
    return {
        close() {
            dispatch(cardModalsActions.close(boardId));
        },
        update(card: Card) {
            dispatch(cardsActions.updateCard(card));
            dispatch(cardModalsActions.hideAllForms(boardId, cardId));
        },
        showSummaryForm() {
            dispatch(cardModalsActions.showSummaryForm(boardId, cardId));
        },
        showDescriptionForm() {
            dispatch(cardModalsActions.showDescriptionForm(boardId, cardId));
        },
        showStartDateForm() {
            dispatch(cardModalsActions.showStartDateForm(boardId, cardId));
        },
        showDueDateForm() {
            dispatch(cardModalsActions.showDueDateForm(boardId, cardId));
        },
        showEstimatedHoursForm() {
            dispatch(cardModalsActions.showEstimatedHoursForm(boardId, cardId));
        },
        showActualHoursForm() {
            dispatch(cardModalsActions.showActualHoursForm(boardId, cardId));
        },
        showPointForm() {
            dispatch(cardModalsActions.showPointForm(boardId, cardId));
        }
    }
};

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps, ownProps: OwnProps): MergeProps => {
    return Object.assign({}, ownProps, {
        updateCard({
            summary = stateProps.summary.value,
            description = stateProps.description.value,
            startDate = stateProps.startDate.value,
            dueDate = stateProps.dueDate.value,
            estimatedHours = `${stateProps.estimatedHours.value}`,
            actualHours = `${stateProps.actualHours.value}`,
            point = `${stateProps.point.value}`,
        }: {
                summary?: string;
                description?: string;
                startDate?: string;
                dueDate?: string;
                estimatedHours?: string;
                actualHours?: string;
                point?: string;
            }) {
            const updateCard = Card.create({
                id: ownProps.data.cardId,
                editing: false,
                summary,
                description,
                startDate,
                dueDate,
                estimatedHours: parseInt(estimatedHours, 10),
                actualHours: parseInt(actualHours, 10),
                point: parseInt(point, 10)
            })
            dispatchProps.update(updateCard);
        }
    })
}

export default connect<StateProps, DispatchProps, OwnProps, MergeProps>(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(CardModal);
