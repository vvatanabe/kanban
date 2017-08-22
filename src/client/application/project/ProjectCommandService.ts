import { injectable } from "inversify";
import {
    BoardId, BoardRepository, BoardType, KanbanBoard, KanbanBoardRepository, ScrumBoard, ScrumBoardRepository,
} from "../../../shared/domain/model";

import { lazyInject } from "../../modules/TaskBoardModules";
import { AddKanbanBoardCommand } from "./AddKanbanBoardCommand";
import { AddScrumBoardCommand } from "./AddScrumBoardCommand";

@injectable()
export default class ProjectCommandService {

    @lazyInject(BoardRepository)
    private readonly boardRepository: BoardRepository;

    @lazyInject(KanbanBoardRepository)
    private readonly kanbanBoardRepository: KanbanBoardRepository;

    @lazyInject(ScrumBoardRepository)
    private readonly scrumBoardRepository: ScrumBoardRepository;

    public addKanbanBoard(command: AddKanbanBoardCommand) {
        const board = KanbanBoard.create(command.name);
        this.kanbanBoardRepository.add(board);
    }

    public addScrumBoard(command: AddScrumBoardCommand) {
        const board = ScrumBoard.create(command.name);
        this.scrumBoardRepository.add(board);
    }

    public deleteBoard(id: BoardId) {
        this.boardRepository.delete(id);
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

export const projectCommandService = new ProjectCommandService();
