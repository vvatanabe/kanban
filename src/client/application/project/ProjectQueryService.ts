import { BoardId, KanbanBoardRepository, Project, ProjectId, ScrumBoard } from "../../../shared/domain/model";
import { getState } from "../../../shared/infractructure/persistence/redux/ReduxStore";

class ProjectQueryService {

    public viewProject(id: ProjectId): Project {
        return getState().projects.find(project => project.id.equals(id));
    }

}

export const projectQueryService = new ProjectQueryService();
