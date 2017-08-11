import * as Redux from 'redux';
import { connect } from 'react-redux';
import { default as ScrumBoard, OwnProps, StateProps, DispatchProps } from '../components/ScrumBoard';
import { AppState, Action, BoardId } from '../../shared/models';
import ScrumBoardDispatcher from '../../shared/dispatchers/ScrumBoardDispatcher';
import store from '../store';

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
    board: state.boards.filter(board => {
        return board.id.value === ownProps.match.params.valueOfBoardId
    })[0]
})

const mapDispatchToProps = (dispatch: Redux.Dispatch<Action<any>>, ownProps: OwnProps): DispatchProps => ({
    scrumBoardDispatcher: new ScrumBoardDispatcher(
    dispatch, store.getState, BoardId.create(ownProps.match.params.valueOfBoardId))
});

export default connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(ScrumBoard);
