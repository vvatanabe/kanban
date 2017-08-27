import * as React from "react";
import {
    ConnectDragPreview, ConnectDragSource, ConnectDropTarget,
    DragSource, DragSourceCollector, DragSourceConnector, DragSourceMonitor, DragSourceSpec,
    DropTarget, DropTargetCollector, DropTargetConnector, DropTargetMonitor, DropTargetSpec,
} from "react-dnd";
import { CardId, UserStoryId } from "../../../../shared/domain/model";
import * as model from "../../../../shared/domain/model";
import Editer from "../Editer";

export interface OwnProps {
    id: UserStoryId;
    onClickCard(cardId: CardId);
    onClickDeleteUserStoryButton(id: UserStoryId);
    onHoverUserStory(src: UserStoryId, dist: UserStoryId);
}

export interface StateProps {
    userStory?: model.UserStory;
}

export interface ActionProps extends React.Props<{}> {
    showFormOfUserStoryName?();
    updateUserStoryName?(name: string);
}

export interface DnDProps {
    connectDragPreview?: ConnectDragPreview;
    connectDragSource?: ConnectDragSource;
    connectDropTarget?: ConnectDropTarget;
    isDragging?: boolean;
}

export type Props = OwnProps & StateProps & ActionProps & DnDProps;

const connectDnDComponent = (component: React.ReactElement<{}>) => (props: Props) => {
    return props.connectDragPreview(
        props.connectDropTarget(
            props.connectDragSource(component),
        ),
    );
};

const UserStoryLane: React.StatelessComponent<Props> = props => connectDnDComponent(
    <div className="user-story" style={{ opacity: props.isDragging ? 0.4 : 1 }}>
        <div className="user-story__header">
            <div className="user-story__header-title">
                <Editer
                    value={props.userStory.summary}
                    onValueClick={props.showFormOfUserStoryName}
                    onEdit={props.updateUserStoryName}
                    editing={props.userStory.editing}
                />
            </div>
            {!props.userStory.editing
                ?
                <div className="user-story__header-button">
                    <button
                        className="delete-user-story-button"
                        onClick={() => props.onClickDeleteUserStoryButton(props.id)}
                    >Delete</button>
                </div>
                :
                null
            }
        </div>
        <ul className="statuses">
            {props.userStory.statusLaneIds.map(statusLaneId => (
                <StatusLane
                    id={statusLaneId}
                    openCardModal={props.openCardModal}
                />
            ))}
        </ul>
    </div>,
)(props);

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
