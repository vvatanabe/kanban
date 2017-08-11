import * as Redux from "redux";
import * as cardModalsAction from "../../shared/actions/cardModals";
import * as cardsAction from "../../shared/actions/cards";
import * as statusLanesAction from "../../shared/actions/statusLanes";
import { Action, AppState, BoardId, CardId, Column, ColumnId, } from "../../shared/models";
import * as statusLaneStore from "../stores/statusLanes";

import boardRepository from "../stores/BoardRepository";

class KanbanBoardApplicationService {

    public viewBoard(boardId: BoardId): Board {
        return boardRepository.findById(boardId);
    }

    // this.dispatch(statusLanesAction.createStatusLane());
    // this.dispatch(boardsAction.attachStatusLaneToBoard(this.boardId));
    public addNewCoulmn(boardId: BoardId) {
        const coulmn = Column.create();
        columnRepository.addCoulmn(coulmn);
        boardRepository.attachCoulmn(this.boardId, coulmn.id);
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
