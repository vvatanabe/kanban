import * as React from "react";
import {
    ConnectDragPreview, ConnectDragSource, ConnectDropTarget,
    DragSource, DragSourceCollector, DragSourceConnector, DragSourceMonitor, DragSourceSpec,
    DropTarget, DropTargetCollector, DropTargetConnector, DropTargetMonitor, DropTargetSpec,
} from "react-dnd";
import { CardId, ColumnId } from "../../../../shared/domain/model";
import * as model from "../../../../shared/domain/model";

export interface StateProps {
    column?: model.Column;
}

export interface ActionProps {
    onClickColumnName?();
    onEditColumnName?(name: string);
    onHoverCardOverCard?(src: CardId, dist: CardId);
    onClickAddCardButton?();
    onClickDeleteCardButton?(cardId: CardId);
    onHoverCard?(cardId: CardId);
}

export interface OwnProps {
    id: ColumnId;
    onClickCard(cardId: CardId);
    onClickDeleteColumnButton(columnId: ColumnId);
    onHoverColumn(src: ColumnId, dist: ColumnId);
}

interface DnDProps {
    connectDragPreview?: ConnectDragPreview;
    connectDragSource?: ConnectDragSource;
    connectDropTarget?: ConnectDropTarget;
    isDragging?: boolean;
}

type Props = OwnProps & StateProps & ActionProps & DnDProps & React.Props<{}>;

const Coulmn: React.StatelessComponent<Props> = props => {
    return props.connectDragPreview(
        props.connectDropTarget(
            props.connectDragSource(<div className="column" style={{ opacity: props.isDragging ? 0.4 : 1 }}>
                <div className="column__header">
                    <div className="column__header-name">
                        <Editer
                            value={props.column.name}
                            onValueClick={props.onClickColumnName}
                            onEdit={props.onEditColumnName}
                            editing={props.column.editing}
                        />
                    </div>
                    {!props.column.editing
                        ?
                        <div className="column__header-button">
                            <button
                                className="delete-column-button"
                                onClick={() => props.onClickDeleteColumnButton(props.id)}
                            >Delete</button>
                        </div>
                        :
                        null
                    }
                </div>
                <ul className="cards">
                    {props.column.cardIds.map(cardId => (
                        <Card
                            id={cardId}
                            key={cardId.value}
                            onClickCard={props.onClickCard}
                            onHoverCard={props.onHoverCardOverCard}
                            onClickDeleteCardButton={props.onClickDeleteCardButton} />
                    ))}
                </ul>
                <button
                    className="add-card-button"
                    onClick={props.onClickAddCardButton} >
                    Add Card
                </button>
            </div >,
            ),
        )
    )
};

// --------------------------------
// react-dnd: Drag
// --------------------------------

interface DnDItem { readonly id: ColumnId; }

const listSource: DragSourceSpec<Props> = {
    beginDrag: (props: Props): DnDItem => ({ id: props.lane.id }),
    isDragging: (props: Props, monitor: DragSourceMonitor): boolean => (
        props.lane.id.equals((monitor.getItem() as DnDItem).id)
    ),
};

const collectDragSource: DragSourceCollector = (
    connect: DragSourceConnector,
    monitor: DragSourceMonitor,
): Object => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
});

const dragSource = DragSource<Props>(DnDItemType.StatusLane, listSource, collectDragSource);

// --------------------------------
// react-dnd: Drop
// --------------------------------

const listTarget: DropTargetSpec<Props> = {
    hover: (targetProps: Props, monitor: DropTargetMonitor) => {
        const sourceType = monitor.getItemType();
        const sourceId = (monitor.getItem() as any).id;
        const targetStatusLaneId = targetProps.lane.id;
        if (sourceType === DnDItemType.Card && targetProps.lane.cardIds.length === 0) {
            targetProps.onHoverCard(sourceId as models.CardId);
        } else if (sourceType === DnDItemType.StatusLane && !models.equals(targetStatusLaneId, sourceId)) {
            targetProps.onHoverColumn(sourceId as models.StatusLaneId, targetStatusLaneId);
        }
    },
};

const collectDropTarget: DropTargetCollector = (
    connect: DropTargetConnector,
): Object => ({
    connectDropTarget: connect.dropTarget(),
});

const dropTarget = DropTarget<Props>([DnDItemType.Card, DnDItemType.StatusLane], listTarget, collectDropTarget);

export default dragSource(dropTarget(Coulmn));
