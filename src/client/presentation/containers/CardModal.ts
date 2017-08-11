import * as Redux from 'redux';
import { connect } from 'react-redux';
import * as Select from 'react-select';
import * as moment from 'moment';
import { default as CardModal, StateProps, DispatchProps, MergeProps, OwnProps } from '../components/CardModal';
import * as cardsActions from '../../shared/actions/cards';
import * as cardModalsActions from '../../shared/actions/cardModals';
import { Action, AppState, Form, Card, Identifier } from '../../shared/models';



interface ModalForm<T> {
    value: T;
    editing: boolean;
}

interface CardModalContents {
    cardId: CardId;
    summary: ModalForm<string>;
    description: ModalForm<string>;
    startDate: ModalForm<string>;
    dueDate: ModalForm<string>;
    estimatedHours: ModalForm<number>;
    actualHours: ModalForm<number>;
    point: ModalForm<number>;
}

class CardModalQueryService {

    constructor(readonly store: any) { }

    public viewCardModal = (cardId: CardId, boardId: BoardId): CardModalContents => {
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

class CardModalCommandService {

    constructor(readonly store: any) { }

    public showFormOfSummary = () => (boardId: BoardId) => {
        const board = this.kanbanBoardRepository.findById(boardId).showFormOfSummaryOnCardModal();
        this.kanbanBoardRepository.update(board);
    }

    public updateCard = (command: UpdateCardCommand) => (boardId: BoardId) => {
        const updatedCard = this.cardRepository.findById(command.id).update({
            summary: command.summary,
            description: command.description,
            startDate: command.startDate,
            dueDate: command.dueDate,
            estimatedHours: command.estimatedHours,
            actualHours: command.actualHours,
            point: command.point,
            editing: false,
        });
        const updatedBoard = this.kanbanBoardRepository.findById(boardId).hideFormOfAllOnCardModal();
        this.cardRepository.update(updatedCard);
        this.kanbanBoardRepository.update(updatedBoard);
    }

}

const cardModalQueryService = new CardModalQueryService({});
const cardModalCommandService = new CardModalCommandService({});


const bindStateToProps = (ownProps: OwnProps): StateProps => {
    const contents = cardModalQueryService.viewCardModal(ownProps.boardId, ownProps.cardId);
    return { contents }
};


interface UpdateCardCommand {
    readonly summary?: string;
    readonly description?: string;
    readonly startDate?: string;
    readonly dueDate?: string;
    readonly estimatedHours?: number;
    readonly actualHours?: number;
    readonly point?: number;
}

const bindActionToProps = (ownProps: OwnProps): ActionProps => ({
    updateCard(values: { [key: string]: any }) {
        const command: UpdateCardCommand = {
            summary: values.summary,
            description: values.description,
            startDate: values.startDate,
            dueDate: values.dueDate,
            estimatedHours: values.estimatedHours,
            actualHours: values.actualHours,
            point: values.point,
        };
        this.commandService.updateCard(ownProps.cardId, command)(ownProps.boardId);
    },
    showFormOfSummary() {
        this.commandService.showFormOfSummary()(ownProps.boardId);
    },
    showFormOfDescription() {
        this.commandService.showFormOfDescription()(ownProps.boardId);
    },
    showFormOfStartDate() {
        this.commandService.showFormOfStartDate()(ownProps.boardId);
    },
    showFormOfDueDate() {
        this.commandService.showFormOfDueDate()(ownProps.boardId);
    },
    showFormOfEstimatedHours() {
        this.commandService.showFormOfEstimatedHours()(ownProps.boardId);
    },
    showFormOfActualHours() {
        this.commandService.showFormOfActualHours()(ownProps.boardId);
    },
    showFormOfPoint() {
        this.commandService.showFormOfPoint()(ownProps.boardId);
    },
});

export default connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(CardModal);
