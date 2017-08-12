import { injectable } from "inversify";
import { BoardId, ScrumBoard } from "../";

@injectable()
export abstract class ScrumBoardRepository {
    public abstract add(board: ScrumBoard);
    public abstract update(board: ScrumBoard);
    public abstract delete(boardId: BoardId);
}
