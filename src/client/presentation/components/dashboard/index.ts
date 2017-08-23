import { Board, BoardId, ProjectId } from "../../../../shared/domain/model";
import { AddProjectCommand } from "../../../application/dashboard/AddProjectCommand";
import { dashBoardCommandService } from "../../../application/dashboard/DashBoardCommandService";
import { dashBoardQueryService } from "../../../application/dashboard/DashBoardQueryService";
import { BindComponentProps } from "../../support";
import { ActionProps, default as DashBoard, OwnProps, StateProps } from "./DashBoard";

const bindStateToProps = (ownProps: OwnProps) => ({
    project: dashBoardQueryService.viewProject(new ProjectId(ownProps.match.params.p)),
});

const bindActionToProps = (ownProps: OwnProps): ActionProps => ({
    addProject: () => {
        const command: AddProjectCommand = { name: "New Project" };
        dashBoardCommandService.addProject(command);
    },
    transitionToProject: (id: ProjectId) => {
        ownProps.history.push(`/projects/${id.value}`);
    },
    showFormOfProjectName: (id: ProjectId) => {
        dashBoardCommandService.showFormOfProjectName(id);
    },
    updateProjectName: (id: ProjectId, value: string) => {
        dashBoardCommandService.updateProjectName(id, value);
    },
    archivingProject: (id: ProjectId) => {
        dashBoardCommandService.archivingProject(id);
    },
});

export default BindComponentProps(
    bindStateToProps,
    bindActionToProps,
)(DashBoard);
