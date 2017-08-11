import * as React from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import TouchBackend from "react-dnd-touch-backend";
import { RouteComponentProps } from "react-router";
import * as models from "../../shared/models";
import CardModal from "../containers/CardModal";
import UserStoryLane from "../containers/UserStoryLane";
import ScrumBoardDispatcher from "../dispatchers/ScrumBoardDispatcher";

export interface StateProps { }

export interface DispatchProps {
    scrumBoardDispatcher?: ScrumBoardDispatcher;
}

export interface OwnProps {
    board: models.Board;
}

export type Props = StateProps & DispatchProps & OwnProps & React.Props<{}>;

const ScrumBoard: React.StatelessComponent<Props> = props => (
    <div className="scrum-board">
        <h3>
            <span className="scrum-board-title">{props.board.name}</span>
            <button
                className="add-story-lane-button"
                onClick={props.scrumBoardDispatcher.addNewStoryLane} >
                Add Story Lane
            </button>
        </h3>
        <div className="story-lane-list">
            {props.board.storyLaneIds.map(storyLaneId => (
                <UserStoryLane
                    id={storyLaneId}
                    key={"storyLaneId.value"}
                    deleteStoryLane={props.scrumBoardDispatcher.deleteStoryLane}
                    moveStoryLane={props.scrumBoardDispatcher.moveStoryLane}
                />
            ))}
        </div>
        {!!props.board.cardModal ? <CardModal boardId={props.board.id} data={props.board.cardModal} /> : null}
    </div>
)

const isMobile = navigator.userAgent
    .match(/(Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone)/i) !== null;

export default DragDropContext(isMobile ? TouchBackend : HTML5Backend)(ScrumBoard);
