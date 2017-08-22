import { Board, BoardId, ProjectId } from "../../../../shared/domain/model";
import ProjectCommandService from "../../../application/project/ProjectCommandService";
import { projectQueryService } from "../../../application/project/ProjectQueryService";
import { BindComponentProps } from "../../support";
import { ActionProps, default as Project, OwnProps, StateProps } from "./Project";

import { injectable } from "inversify";
import { lazyInject } from "../../../modules/TaskBoardModules";

const bindStateToProps = (ownProps: OwnProps): StateProps => ({
  boards: projectQueryService.viewProject(new ProjectId(ownProps.match.params.id)),
});

@injectable()
class ProjectServiceDispatcher implements ActionProps {

  @lazyInject(ProjectCommandService)
  private readonly projectCommandService: ProjectCommandService;

  constructor(
    private readonly props: OwnProps) {

  }

  public onClickBoardTile = (id: BoardId) => {
    this.props.history.push(`/board/${id.value}`);
  }

  public onClickBoardName = (id: BoardId) => {
    this.projectCommandService.showFormOfBoardName(id);
  }

  public onEditBoardName = (id: BoardId, value: string) => {
    this.projectCommandService.updateBoardName(id, value);
  }

  public onClickDeleteBoardButton = (id: BoardId) => {
    this.projectCommandService.deleteBoard(id);
  }

}

const bindActionToProps2 = (ownProps: OwnProps): ActionProps => new ActionDispatcher(ownProps);

const bindActionToProps = (ownProps: OwnProps): ActionProps => ({
  public addKanbanBoard() {
    const board = Board.create({
      name: command.name,
      type: BoardType.KanbanBoard,
    });
    this.boardRepository.add(board);
  }

    public addScrumBoard(command: AddScrumBoardCommand) {
    const board = Board.create({
      name: command.name,
      type: BoardType.ScrumBoard,
    });
    this.boardRepository.add(board);
  }

    public deleteBoard(boardId: BoardId) {
    this.boardRepository.delete(boardId);
  }


    public updateBoardName(id: BoardId, name: string) {
    const boardToUpdate = this.boardRepository.findById(id).updateName(name).endEditing();
    this.boardRepository.update(boardToUpdate);
  }
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Project);
