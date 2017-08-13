import { connect } from "react-redux";
import * as Redux from "redux";
import { projectApplicationService } from "../../application/project/ProjectApplicationService";
import { Action, AppState } from "../../shared/models";
import { default as Project, DispatchProps, OwnProps, StateProps } from "../components/Project";

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
  kanbanBoards: state.kanbanBoards,
  scrumBoards: state.scrumBoards,
  orderOfBoards: state.kanbanBoards
    .concat(state.scrumBoards)
    .sort((b1, b2) => new Date(b1.date) - new Date(b2.date)),
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Action<any>>, ownProps: OwnProps): DispatchProps => ({
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

    public showFormOfBoardName(id: BoardId) {
    const boardToUpdate = this.boardRepository.findById(id).beginEditing();
    this.boardRepository.update(boardToUpdate);
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
