import KanbanBoardId from "../../../shared/domain/model/kanbanboard/KanbanBoardId";

export default interface AddCoulmnCommand {
    readonly boardId: KanbanBoardId;
    readonly name: String;
}