import { List } from "immutable";
import { injectable } from "inversify";

import { Column, ColumnId, KanbanBoard, BoardId } from "../../../shared/domain/model";
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

    public addColumn = (boardId: BoardId, command: AddCoulmnCommand) => {
        const column = Column.create(command.name);
        const addedCoulmn = this.columnRepository.addCoulmn(column);
        this.kanbanBoardRepository.attachCoulmn(boardId, addedCoulmn.id);
    }

    public deleteCoulmn(boardId: BoardId, columnId: ColumnId) {
        this.kanbanBoardRepository.detachCoulmn(boardId, columnId);
        this.columnRepository.deleteCoulmn(columnId);
        this.cardsRepository.deleteCardsByCoulmnId(columnId);
    }

    public moveCoulmnOnBoard(src: CoulmnId, dist: CoulmnId) {
        this.dispatch(statusLanesAction.moveStatusLane(src, dist));
    }

    public openCardModalOnBoard(cardId: CardId, boardId: BoardId) {
        const boardToUpdate = this.kanbanBoardRepository.findById(boardId).openCardModal(cardId);
        this.boardRepository.update(boardToUpdate);
    }

    public closeCardModalOnBoard(cardId: CardId, boardId: BoardId) {
        const boardToUpdate = this.kanbanBoardRepository.findById(boardId).closeCardModal(cardId);
        this.boardRepository.update(boardToUpdate);
    }

}

export const kanbanBoardCommandService = new KanbanBoardCommandService();
