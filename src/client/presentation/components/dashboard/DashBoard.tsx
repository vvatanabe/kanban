import { List } from "immutable";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { Project, ProjectId } from "../../../../shared/domain/model";
import * as model from "../../../../shared/domain/model";
import ProjectTile from "../projecttile";

export interface OwnProps extends RouteComponentProps<{ projectId: string }> { }

export interface StateProps {
    projects: List<Project>;
}

export interface ActionProps {
    addProject();
    transitionToProject(id: ProjectId);
    showFormOfProjectName(id: ProjectId);
    updateProjectName(id: ProjectId, value: string);
    archivingProject(id: ProjectId);
}

export type Props = OwnProps & StateProps & ActionProps;

const DashBoard: React.StatelessComponent<Props> = props => (
    <div>
        <h3>
            <span className="dash-board-title">DashBoard</span>
            <button className="add-project-button" onClick={props.addProject}>Add Project</button>
        </h3>
        <div className="projects">
            {props.projects.map(project => (
                <ProjectTile
                    project={project}
                    onClickProjectTile={props.transitionToProject}
                    onClickProjectName={props.showFormOfProjectName}
                    onEditProjectName={props.updateProjectName}
                    onClickArchivingProjectButton={props.archivingProject}
                />
            ))}
        </div>
    </div>
);

export default DashBoard;
