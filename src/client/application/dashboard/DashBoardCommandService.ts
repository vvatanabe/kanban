import { injectable } from "inversify";
import {
    BoardId, BoardType, KanbanBoard, KanbanBoardRepository,
    Project, ProjectId, ProjectRepository, ScrumBoard, ScrumBoardRepository,
} from "../../../shared/domain/model";
import { lazyInject } from "../../modules/TaskBoardModules";
import { AddProjectCommand } from "./AddProjectCommand";
import { UpdateProjectCommand } from "./UpdateProjectCommand";

@injectable()
class DashBoardCommandService {

    @lazyInject(ProjectRepository)
    private readonly projectRepository: ProjectRepository;

    public addProject(command: AddProjectCommand) {
        const project = Project.create(command.name);
        this.projectRepository.add(project);
    }

    public showFormOfProjectName(id: ProjectId) {
        const updatedProject = this.projectRepository.find(id).startEditing();
        this.projectRepository.update(updatedProject);
    }

    public updateProjec(id: ProjectId, command: UpdateProjectCommand) {
        const updatedProject = this.projectRepository.find(id).updateName(command.name);
        this.projectRepository.update(updatedProject);
    }

    public archivingProject(id: ProjectId) {
        const updatedProject = this.projectRepository.find(id).archiving();
        this.projectRepository.update(updatedProject);
    }

}

export const dashBoardCommandService = new DashBoardCommandService();
