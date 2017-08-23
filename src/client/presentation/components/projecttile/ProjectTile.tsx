import * as React from "react";
import { Project, ProjectId } from "../../../../shared/domain/model";
import Editer from "../Editer";

export interface OwnProps extends React.Props<{}> {
    project: Project;
    onClickProjectTile(id: ProjectId);
    onClickProjectName(id: ProjectId);
    onEditProjectName(id: ProjectId, value: string);
    onClickArchivingProjectButton(id: ProjectId);
}

type Props = OwnProps;

const ProjectTile: React.StatelessComponent<Props> = props => (
    <div className="project-tile" onClick={() => props.onClickProjectTile(props.project.id)}>
        <div className="project-tile__header" onClick={e => e.stopPropagation()}>
            <div className="project-tile__header__title">
                <Editer
                    value={props.project.name}
                    onValueClick={() => props.onClickProjectName(props.project.id)}
                    onEdit={value => props.onEditProjectName(props.project.id, value)}
                    editing={props.project.editing}
                />
            </div>
            <div className="project-tile__header__button">
                <button className="archiving-project-button"
                    onClick={() => props.onClickArchivingProjectButton(props.project.id)}>Archiving</button>
            </div>
        </div>
    </div>
);

export default ProjectTile;
