import { injectable } from "inversify";
import {
    Card, CardId, CardRepository, Column, ColumnId, ColumnRepository,
} from "../../../shared/domain/model";
import { lazyInject } from "../../modules/TaskBoardModules";
import { AddCardCommand } from "./AddCardCommand";
import { ColumnCard } from "./ColumnCard";
import { MoveCardCommand } from "./MoveCardCommand";
import { UpdateColumnCommand } from "./UpdateColumnCommand";

@injectable()
class ColumnCommandService {

    @lazyInject(ColumnRepository)
    private readonly columnRepository: ColumnRepository;

    @lazyInject(CardRepository)
    private readonly cardRepository: CardRepository;

    public addCard = (columnId: ColumnId, command: AddCardCommand) => {
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
        const updatedColumn = this.columnRepository.find(columnId).attachCard(card.id);
        this.columnRepository.update(updatedColumn);
    }

    public deleteCard(columnId: ColumnId, cardId: CardId) {
        const updatedColumn = this.columnRepository.find(columnId).detachCard(cardId);
        this.columnRepository.update(updatedColumn);
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
