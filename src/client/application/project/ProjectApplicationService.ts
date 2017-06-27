import { injectable } from "inversify";
import Board from "../../../shared/domain/model/board/Board";
import BoardId from "../../../shared/domain/model/board/BoardId";
import BoardRepository from "../../../shared/domain/model/board/BoardRepository";
import BoardType from "../../../shared/domain/model/board/BoardType";
import { lazyInject } from "../../modules/TaskBoardModules";
import AddKanbanBoardCommand from "./AddKanbanBoardCommand";
import AddScrumBoardCommand from "./AddScrumBoardCommand";

@injectable()
export default class ProjectApplicationService {

    @lazyInject(BoardRepository)
    private readonly boardRepository: BoardRepository;

    public addKanbanBoard(command: AddKanbanBoardCommand) {
        const board = Board.create({
            name: command.name,
            type: BoardType.KanbanBoard,
        });
        this.boardRepository.add(board);
    }

    public addScrumBoard(command: AddScrumBoardCommand) {
        const board = Board.create({
            name: command.name,
            type: BoardType.ScrumBoard,
        });
        this.boardRepository.add(board);
    }

    public deleteBoard(boardId: BoardId) {
        this.boardRepository.delete(boardId);
    }

    public showFormOfBoardName(id: BoardId) {
        const boardToUpdate = this.boardRepository.findById(id).beginEditing();
        this.boardRepository.update(boardToUpdate);
    }

    public updateBoardName(id: BoardId, name: string) {
        const boardToUpdate = this.boardRepository.findById(id).updateName(name).endEditing();
        this.boardRepository.update(boardToUpdate);
    }

}

export const projectApplicationService = new ProjectApplicationService();
