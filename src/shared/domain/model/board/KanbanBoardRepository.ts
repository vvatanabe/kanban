import { injectable } from "inversify";
import { BoardId, KanbanBoard } from "../";

@injectable()
export abstract class KanbanBoardRepository {
    public abstract add(board: KanbanBoard);
    public abstract update(board: KanbanBoard);
    public abstract delete(id: BoardId);
    public abstract find(id: BoardId): KanbanBoard;
}
