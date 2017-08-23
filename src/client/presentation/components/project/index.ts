import { Board, BoardId, ProjectId } from "../../../../shared/domain/model";
import { AddKanbanBoardCommand } from "../../../application/project/AddKanbanBoardCommand";
import { AddScrumBoardCommand } from "../../../application/project/AddScrumBoardCommand";
import { projectCommandService } from "../../../application/project/ProjectCommandService";
import { projectQueryService } from "../../../application/project/ProjectQueryService";
import { BindComponentProps } from "../../support";
import { ActionProps, default as Project, OwnProps, StateProps } from "./Project";

const bindStateToProps = (ownProps: OwnProps) => ({
    project: projectQueryService.viewProject(new ProjectId(ownProps.match.params.id)),
});

const bindActionToProps = (ownProps: OwnProps): ActionProps => ({
    onClickAddScrumBoardButton: () => {
        const command: AddScrumBoardCommand = { name: "New Scrum Board" };
        projectCommandService.addScrumBoard(command);
    },
    onClickAddKanbanBoardButton: () => {
        const command: AddKanbanBoardCommand = { name: "New Kanban Board" };
        projectCommandService.addKanbanBoard(command);
    },
    onClickBoardTile: (id: BoardId) => {
        ownProps.history.push(`/board/${id.value}`);
    },
    onClickBoardName: (id: BoardId) => {
        projectCommandService.showFormOfBoardName(id);
    },
    onEditBoardName: (id: BoardId, value: string) => {
        projectCommandService.updateBoardName(id, value);
    },
    onClickDeleteBoardButton: (id: BoardId) => {
        projectCommandService.deleteBoard(id);
    },
});

export default BindComponentProps(
    bindStateToProps,
    bindActionToProps,
)(Project);
