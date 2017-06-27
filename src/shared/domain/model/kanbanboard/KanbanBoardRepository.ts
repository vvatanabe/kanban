import { injectable } from "inversify";
import { KanbanBoard, KanbanBoardId } from "../";

@injectable()
export default abstract class KanbanBoardRepository {
    public abstract add(board: KanbanBoard);
    public abstract update(board: KanbanBoard);
    public abstract delete(id: KanbanBoardId);
}
