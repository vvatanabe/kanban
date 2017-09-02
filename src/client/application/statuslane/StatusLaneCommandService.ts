import { injectable } from "inversify";
import { Card, CardId, CardRepository, StatusLaneId, StatusLaneRepository } from "../../../shared/domain/model";
import { lazyInject } from "../../modules/TaskBoardModules";

@injectable()
class StatusLaneCommandService {

    @lazyInject(StatusLaneRepository)
    private readonly statusLaneRepository: StatusLaneRepository;

    @lazyInject(CardRepository)
    private readonly cardRepository: CardRepository;

    public addCard = (id: StatusLaneId, command: AddCardCommand) => {
        const card = Card.create({
            summary: command.summary,
            description: command.description,
            startDate: command.startDate,
            dueDate: command.dueDate,
            estimatedHours: command.estimatedHours,
            actualHours: command.actualHours,
            point: command.point,
        });
        this.cardRepository.add(card);
        const updatedStatusLane = this.statusLaneRepository.find(id).attachCard(card.id);
        this.statusLaneRepository.update(updatedStatusLane);
    }

    public deleteCard(id: StatusLaneId, cardId: CardId) {
        const updatedStatusLane = this.statusLaneRepository.find(id).detachCard(cardId);
        this.statusLaneRepository.update(updatedStatusLane);
        this.cardRepository.delete(cardId);
    }

    public moveCard(command: MoveCardCommand) {
        const { src, dist } = command;
        const detached = this.columnRepository.findByCardId(src).detachCard(src);
        const attached = this.columnRepository.findByCardId(dist).attachCard(dist);
        this.columnRepository.update(detached);
        this.columnRepository.update(attached);
    }

    public showFormOfColumnName(columnId: ColumnId) {
        const updatedColumn = this.columnRepository.find(columnId).startEditing();
        this.columnRepository.update(updatedColumn);
    }

    public updateColumn(columnId: ColumnId, command: UpdateColumnCommand) {
        const updatedColumn = this.columnRepository.find(columnId).updateName(command.name);
        this.columnRepository.update(updatedColumn);
    }

    public attachCard(columnId: ColumnId, cardId: CardId) {
        const updatedColumn = this.columnRepository.find(columnId).attachCard(cardId);
        this.columnRepository.update(updatedColumn);
    }

}

export const columnCommandService = new ColumnCommandService();
