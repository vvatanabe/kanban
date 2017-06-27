import { List } from "immutable";
import { injectable } from "inversify";
import Column from "../../../shared/domain/model/column/Column";
import Board from "../../../shared/domain/model/board/Board";
import BoardId from "../../../shared/domain/model/board/BoardId";
import BoardRepository from "../../../shared/domain/model/board/BoardRepository";
import BoardType from "../../../shared/domain/model/board/BoardType";
import { lazyInject } from "../../modules/TaskBoardModules";
import AddKanbanBoardCommand from "./AddKanbanBoardCommand";
import AddScrumBoardCommand from "./AddScrumBoardCommand";
import ColumnRepository from "../../../shared/domain/model/columnRepository/ColumnRepository";
import KanbanBoardRepository from "../../../shared/domain/model/kanbanboard/KanbanBoardRepository";
import AddCoulmnCommand from "./AddCoulmnCommand";

@injectable()
class KanbanBoardCommandService {

    @lazyInject(KanbanBoardRepository)
    private readonly kanbanBoardRepository: KanbanBoardRepository;
    @lazyInject(ColumnRepository)
    private readonly columnRepository: ColumnRepository;


    // this.dispatch(statusLanesAction.createStatusLane());
    // this.dispatch(boardsAction.attachStatusLaneToBoard(this.boardId));
    public addColumn(command: AddCoulmnCommand) {
        const column = Column.create({ name: command.name });
        const addedCoulmn = this.columnRepository.addCoulmn(column);
        this.kanbanBoardRepository.attachCoulmn(command.boardId, addedCoulmn.id);
    }

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

    public openCardModalOnBoard(cardId: CardId) {
        this.dispatch(cardModalsAction.openCardModal(this.boardId, cardId));
    }

}

export default KanbanBoardApplicationService;
