import { injectable } from "inversify";
import { ScrumBoard, ScrumBoardId } from "../";

@injectable()
export abstract class ScrumBoardRepository {
    public abstract add(board: ScrumBoard);
    public abstract update(board: ScrumBoard);
    public abstract delete(boardId: ScrumBoardId);
}
