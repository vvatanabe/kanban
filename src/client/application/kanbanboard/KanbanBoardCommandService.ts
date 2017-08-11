import { List } from "immutable";
import { injectable } from "inversify";

import { Column, KanbanBoard, KanbanBoardId } from "../../../shared/domain/model";
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

    public addColumn = (command: AddCoulmnCommand) => (boardId: KanbanBoardId) => {
        const column = new Column({ name: command.name });
        const addedCoulmn = this.columnRepository.addCoulmn(column);
        this.kanbanBoardRepository.attachCoulmn(boardId, addedCoulmn.id);
    };

    // this.dispatch(statusLanesAction.detachStatusLaneFromBoard(this.boardId, laneId));
    // this.dispatch(statusLanesAction.deleteStatusLane(laneId));
    // this.dispatch(cardsAction.deleteCards(statusLaneStore.findById(laneId).cardIds));
    public deleteCoulmnFromBoard(coulmnId: CoulmnId, boardId: BoardId) {
        boardRepository.detachCoulmn(this.boardId, coulmnId);
        columnRepository.deleteCoulmn(coulmnId);
        cardsRepository.deleteCardsByCoulmnId(coulmnId);
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

export const kanbanBoardApplicationService = new KanbanBoardCommandService();
