import { List } from "immutable";
import { injectable } from "inversify";

import { CardId, Column, ColumnId, KanbanBoard, BoardId } from "../../../shared/domain/model";
import BoardRepository from "../../../shared/domain/model/board/BoardRepository";
import { lazyInject } from "../../modules/TaskBoardModules";
import AddKanbanBoardCommand from "./AddKanbanBoardCommand";
import AddScrumBoardCommand from "./AddScrumBoardCommand";
import ColumnRepository from "../../../shared/domain/model/columnRepository/ColumnRepository";
import KanbanBoardRepository from "../../../shared/domain/model/kanbanboard/KanbanBoardRepository";
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
        const addedCoulmn = this.columnRepository.addCoulmn(column);
        this.kanbanBoardRepository.attachCoulmn(boardId, addedCoulmn.id);
    }

    public deleteCoulmn(boardId: BoardId, columnId: ColumnId) {
        this.kanbanBoardRepository.detachCoulmn(boardId, columnId);
        this.columnRepository.deleteCoulmn(columnId);
        this.cardRepository.deleteCardsByCoulmnId(columnId);
    }

    public moveCoulmn(boardId: BoardId, src: ColumnId, dist: ColumnId) {
        const updatedBoard = this.kanbanBoardRepository.findById(boardId).moveCoulmn(src, dist);
        this.kanbanBoardRepository.update(updatedBoard);
    }

    public openCardModal(boardId: BoardId, cardId: CardId) {
        const updatedBoard = this.kanbanBoardRepository.findById(boardId).openCardModal(cardId);
        this.kanbanBoardRepository.update(updatedBoard);
    }

    public closeCardModal(boardId: BoardId, cardId: CardId) {
        const updatedBoard = this.kanbanBoardRepository.findById(boardId).closeCardModal(cardId);
        this.kanbanBoardRepository.update(updatedBoard);
    }

}

export const kanbanBoardCommandService = new KanbanBoardCommandService();
