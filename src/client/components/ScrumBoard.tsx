import * as React from 'react';
import StoryLane from '../containers/StoryLane';
import CardModal from '../containers/CardModal';
import * as models from '../../shared/models';
import { RouteComponentProps } from "react-router";
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import { DragDropContext } from 'react-dnd';

export interface ScrumBoardStateProps {
    bord?: models.ScrumBoard;
    isOpenCardModal?: boolean;
}

export interface ScrumBoardDispatchProps {
    showCardModal?(cardId: string);
    createStoryLane?(boardId: string);
    deleteStoryLane?(boardId: string, storyLaneId: string);
    editStoryLane?(storyLaneId: string, storyLaneName: string);
    moveStoryLane?(sourceId: string, targetId: string);
}

export type ScrumBoardProps = ScrumBoardStateProps
& ScrumBoardDispatchProps
& RouteComponentProps<{ bordId: string }>;

const ScrumBoard: React.StatelessComponent<ScrumBoardProps> = (props) => {
    return (
        <div className="scrumboard">
            <h3>
                <span className="scrumboard-title">{props.bord.name}</span>
                <button
                    className="add-list-button"
                    onClick={() => {props.createStoryLane(props.bord.id)}}
                    >
                    Add List
                </button>
            </h3>
            <div className="lists">
                {props.bord.storyLaneIds.map(storyLaneId => (
                    <StoryLane
                        id={storyLaneId}
                        key={storyLaneId}
                        showCardModal={props.showCardModal}
                        editStoryLane={props.editStoryLane}
                        deleteStoryLane={storyLaneId => props.deleteStoryLane(props.bord.id, storyLaneId)}
                        moveStoryLane={props.moveStoryLane}
                        />
                ))}
            </div>
            {props.bord.cardModal.isOpen ?
            <CardModal
                bordId={props.bord.id}
                cardId={props.bord.cardModal.cardId}
                userIds={[]}
                editable={props.bord.cardModal.editableForm}
                />
                : null
            }
        </div>
    )
};

const isMobile= navigator.userAgent
    .match(/(Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone)/i) !== null

export default DragDropContext(isMobile ? TouchBackend : HTML5Backend)(ScrumBoard);