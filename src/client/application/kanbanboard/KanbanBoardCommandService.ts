import { List } from "immutable";
import { injectable } from "inversify";

import {
    BoardId, CardId, CardRepository, Column, ColumnId,
    ColumnRepository, KanbanBoard, KanbanBoardRepository,
} from "../../../shared/domain/model";
import { lazyInject } from "../../modules/TaskBoardModules";
import { AddCoulmnCommand } from "./AddCoulmnCommand";

@injectable()
class KanbanBoardCommandService {

    @lazyInject(KanbanBoardRepository)
    private readonly kanbanBoardRepository: KanbanBoardRepository;
    @lazyInject(ColumnRepository)
    private readonly columnRepository: ColumnRepository;
    @lazyInject(CardRepository)
    private readonly cardRepository: CardRepository;

    public addColumn = (boardId: BoardId, command: AddCoulmnCommand) => {
        const column = Column.create(command.name);
        this.columnRepository.add(column);
        const updatedBoard = this.kanbanBoardRepository.find(boardId).attachColumn(column.id);
        this.kanbanBoardRepository.update(updatedBoard);
    }

    public deleteCoulmn(boardId: BoardId, columnId: ColumnId) {
        const updatedBoard = this.kanbanBoardRepository.find(boardId).detachColumn(columnId);
        this.kanbanBoardRepository.update(updatedBoard);
        this.columnRepository.delete(columnId);
        this.cardRepository.deleteByColumnId(columnId);
    }

    public moveCoulmn(boardId: BoardId, src: ColumnId, dist: ColumnId) {
        const updatedBoard = this.kanbanBoardRepository.find(boardId).moveCoulmn(src, dist);
        this.kanbanBoardRepository.update(updatedBoard);
    }

    public openCardModal(boardId: BoardId, cardId: CardId) {
        const updatedBoard = this.kanbanBoardRepository.find(boardId).openCardModal(cardId);
        this.kanbanBoardRepository.update(updatedBoard);
    }

    public closeCardModal(boardId: BoardId) {
        const updatedBoard = this.kanbanBoardRepository.find(boardId).closeCardModal();
        this.kanbanBoardRepository.update(updatedBoard);
    }

}

export const kanbanBoardCommandService = new KanbanBoardCommandService();
