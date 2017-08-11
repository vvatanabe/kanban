import { injectable } from "inversify";
import {
    Card, CardId, CardRepository, Column, ColumnId, ColumnRepository,
} from "../../../shared/domain/model";
import { lazyInject } from "../../modules/TaskBoardModules";
import { AddCardCommand } from "./AddCardCommand";

@injectable()
export class ColumnCommandService {

    @lazyInject(ColumnRepository)
    private readonly columnRepository: ColumnRepository;

    @lazyInject(CardRepository)
    private readonly cardRepository: CardRepository;

    public addCard = (command: AddCardCommand) => (columnId: ColumnId) => {
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
        const updatedColumn = columnRepository.findById(columnId).attachCard(card.id);
        this.columnRepository.update(updatedColumn);
    }

    public deleteCard(cardId: CardId) {
        const detachCardFromCoulmnAct = cardsAction.detachCardFromCoulmn(this.id, cardId);
        const deleteCardAct = cardsAction.deleteCard(cardId);
        this.dispatch(detachCardFromCoulmnAct);
        this.dispatch(deleteCardAct);
    }

    public attachCard(cardId: CardId) {

    }

    public moveCard(from: CardId, to: CardId) {
        // TODO
    }

    public showNameForm() {
        this.dispatch(statusLanesAction.showStatusLaneNameForm(this.statusLaneId));
    }

    public updateName(name: String) {
        this.dispatch(statusLanesAction.updateStatusLaneName(this.statusLaneId, name));
    }

}