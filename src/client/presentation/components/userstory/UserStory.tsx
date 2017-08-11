import * as React from 'react';
import {
    ConnectDragPreview, ConnectDragSource, ConnectDropTarget,
    DragSource, DragSourceSpec, DragSourceMonitor, DragSourceConnector, DragSourceCollector,
    DropTarget, DropTargetSpec, DropTargetMonitor, DropTargetConnector, DropTargetCollector
} from 'react-dnd';

import Card from '../containers/Card';
import StatusLane from '../containers/StatusLane';
import Editer from './Editer';

import * as models from '../../shared/models';
import StoryLaneDispatcher from '../../shared/dispatchers/StoryLaneDispatcher';
import DnDItemType from '../../shared/constants/DnDItemType';

export interface StateProps {
    storyLane?: models.StoryLane;
}

export interface DispatchProps {
    storyLaneDispatcher: StoryLaneDispatcher
}

export interface DnDProps {
    connectDragPreview?: ConnectDragPreview;
    connectDragSource?: ConnectDragSource;
    connectDropTarget?: ConnectDropTarget;
    isDragging?: boolean;
}

export interface OwnProps {
    id: models.StoryLaneId;
    deleteStoryLane(laneId: models.StoryLaneId);
    moveStoryLane(from: models.StoryLaneId, to: models.StoryLaneId);
    openCardModal(cardId: models.CardId);
}

export type Props = OwnProps
    & StateProps
    & DispatchProps
    & DnDProps
    & React.Props<{}>;

const UserStoryLane: React.StatelessComponent<Props> = props => {

    return props.connectDragPreview(
        props.connectDropTarget(
            props.connectDragSource(<div className="storylane" style={{ opacity: props.isDragging ? 0.4 : 1 }}>
                <div className="storylane__header">
                    <div className="storylane__header-title">
                        <Editer
                            value={props.storyLane.summary}
                            onValueClick={props.onShowStoryCardSummaryForm}
                            onEdit={props.updateCard}
                            editing={props.storyLane.editing}
                        />
                    </div>
                    {!props.storyCard.editing ?
                        <div className="list__header-button">
                            <button
                                className="delete-list-button"
                                onClick={deleteStatusLane}
                            >Delete</button>
                            <button
                                className="add-card-button"
                                onClick={handleCreateCard}
                            >Add Card</button>
                        </div>
                        : null}
                </div>
                // TODO StatusLane has to become component.
                <ul className="statuses">{props.storyLane.statusLaneIds.map(statusLaneId => (
                    <StatusLane
                        id={statusLaneId}
                        openCardModal={props.openCardModal}
                    />
                ))}</ul>
            </div>)
        )
    )
}

// --------------------------------
// react-dnd: Drag Setting
// --------------------------------

type DnDItem = models.Entity<models.StoryLaneId>;

const dragSourceSpec: DragSourceSpec<Props> = {
    beginDrag: (props: Props): DnDItem => ({
        id: props.storyLane.id
    }),
    isDragging: (props: Props, monitor: DragSourceMonitor): boolean => (
        models.equals(
            props.storyLane.id, (monitor.getItem() as DnDItem).id
        )
    )
};

const dragSourceCollector: DragSourceCollector = (
    connect: DragSourceConnector,
    monitor: DragSourceMonitor
): Object => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
});

const dragSource = DragSource<Props>(DnDItemType.StoryLane, dragSourceSpec, dragSourceCollector)

// --------------------------------
// react-dnd: Drop Setting
// --------------------------------

const dropTargetSpec: DropTargetSpec<Props> = {
    hover: (targetProps: Props, monitor: DropTargetMonitor) => {
        const sourceType = monitor.getItemType() as DnDItemType;
        const sourceId = (monitor.getItem() as DnDItem).id;
        const targetId = targetProps.storyLane.id;
        if (sourceType === DnDItemType.StoryLane && !models.equals(targetId, sourceId)) {
            targetProps.moveStoryLane(sourceId, targetId);
        }
    }
};

const dropTargetCollector: DropTargetCollector = (
    connect: DropTargetConnector
): Object => ({
    connectDropTarget: connect.dropTarget(),
});

const dropTarget = DropTarget<Props>(DnDItemType.StoryLane, dropTargetSpec, dropTargetCollector);


export default dragSource(dropTarget(UserStoryLane));
