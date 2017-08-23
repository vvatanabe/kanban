import { injectable } from "inversify";
import { Project, ProjectId } from "../";

@injectable()
export abstract class ProjectRepository {
    public abstract add(project: Project);
    public abstract update(project: Project);
    public abstract find(id: ProjectId): Project;
}
