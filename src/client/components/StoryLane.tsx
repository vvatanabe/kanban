import * as React from 'react';
import { ConnectDragPreview, ConnectDragSource, ConnectDropTarget } from 'react-dnd';
import { DragSource, DragSourceSpec, DragSourceMonitor, DragSourceConnector, DragSourceCollector } from 'react-dnd';
import { DropTarget, DropTargetSpec, DropTargetMonitor, DropTargetConnector, DropTargetCollector } from 'react-dnd';
import { Item } from '../../shared/constants/itemType';
import Card from '../containers/Card';
import StatusLane from '../containers/StatusLane';
import Editer from './Editer';
import * as models from '../../shared/models';

export interface StoryLaneStateProps {
    lane?: models.StoryLane;
    card?: models.Card;
}

export interface StoryLaneDispatchProps {
    createCard?(laneId: string);
    editCard?(cardId: string);
    updateCard?(cardId: string, value: string);
    deleteCard?(laneId: string, cardId: string);
    moveCard?(sourceId: string, targetId: string);
    attachToLane?(targetId: string, sourceId: string);
}

export interface StoryLaneDndProps {
    connectDragPreview?: ConnectDragPreview;
    connectDragSource?: ConnectDragSource;
    connectDropTarget?: ConnectDropTarget;
    isDragging?: boolean;
}

export type StoryLaneProps = {
    id: string;
    deleteStoryLane(laneId: string);
    editStoryLane(laneId: string, name?: string);
    moveStoryLane(sourceId: string, targetId: string);
    showCardModal(cardId: string);
}
& StoryLaneStateProps
& StoryLaneDispatchProps
& StoryLaneDndProps
& React.Props<{}>;

const StoryLane: React.StatelessComponent<StoryLaneProps> = (props) => {

    const handleCreateCard = () => {
        props.createCard(props.lane.id);
    }

    // TODO onDeleteCardの第一引数のnull　があやしい
    const handleDeleteLane = () => {
        props.deleteStoryLane(props.lane.id);
        props.card.childIds.forEach(cardId => props.deleteCard(null, cardId));
    }

    const handleDeleteCard = (cardId: string) => {
        props.deleteCard(props.lane.id, cardId);
    }

    return props.connectDragPreview(
        props.connectDropTarget(
            props.connectDragSource(<div className="list" style={{ opacity: props.isDragging ? 0.4 : 1 }}>
                <div className="list__header">
                    <div className="list__header-title">
                        <Editer
                            id={props.lane.id}
                            value={props.card.summary}
                            onValueClick={props.editStoryLane}
                            onEdit={props.editStoryLane}
                            editing={props.lane.editing}
                            />
                    </div>
                    {!props.lane.editing ?
                    <div className="list__header-button">
                        <button
                            className="delete-list-button"
                            onClick={handleDeleteLane}
                            >Delete</button> 
                        <button
                            className="add-card-button"
                            onClick={handleCreateCard}
                            >Add Card</button>
                    </div>
                    : null}
                </div>
                // TODO StatusLane has to become component.
                <ul className="statuses">{props.lane.statusLaneIds.map(statusLaneId => (
                    <StatusLane id={statusLaneId} />
                ))}</ul>
            </div>)
        )
    )
}

// --------------------------------
// react-dnd: Drag
// --------------------------------

interface Item {
    id: string;
}

const laneSource: DragSourceSpec<StoryLaneProps> = {
    beginDrag: (props: StoryLaneProps): Item => {
        return {
            id: props.lane.id
        }
    },
    isDragging: (props: StoryLaneProps, monitor: DragSourceMonitor): boolean => (
        props.lane.id === (monitor.getItem() as Item).id
    )
};

const collectDragSource: DragSourceCollector = (
    connect: DragSourceConnector,
    monitor: DragSourceMonitor
): Object => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
});

const dragSource = DragSource<StoryLaneProps>(Item.List, laneSource, collectDragSource)

// --------------------------------
// react-dnd: Drop
// --------------------------------

const laneTarget: DropTargetSpec<StoryLaneProps> = {
    hover: (targetProps: StoryLaneProps, monitor: DropTargetMonitor) => {
        const sourceType = monitor.getItemType();
        const sourceId = (monitor.getItem() as Item).id;
        const targetId = targetProps.lane.id;
        if (!targetProps.card.childIds.length && sourceType === Item.Card) {
            targetProps.attachToLane(targetId, sourceId);
        } else if (targetId !== sourceId && sourceType === Item.List) {
            targetProps.moveStoryLane(sourceId, targetId);
        }
    }
};

const collectDropTarget: DropTargetCollector = (
    connect: DropTargetConnector
): Object => ({
    connectDropTarget: connect.dropTarget(),
});

const dropTarget = DropTarget<StoryLaneProps>([Item.Card, Item.List], laneTarget, collectDropTarget);


export default dragSource(dropTarget(StoryLane));
