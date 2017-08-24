import { List } from "immutable";
import { Project } from "../../../shared/domain/model";
import { getState } from "../../../shared/infractructure/persistence/redux/ReduxStore";

class DashBoardQueryService {

    public viewDashBoard(): List<Project> {
        return getState().projects.filter(project => !project.archived).toList();
    }

}

export const boardQueryService = new DashBoardQueryService();
