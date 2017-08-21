import * as React from "react";
import {
  ConnectDragSource, ConnectDropTarget, DragSource, DragSourceCollector, DragSourceConnector, DragSourceMonitor,
  DragSourceSpec, DropTarget, DropTargetCollector, DropTargetConnector, DropTargetMonitor, DropTargetSpec,
} from "react-dnd";
import DnDItemType from "../../shared/constants/DnDItemType";
import * as models from "../../shared/models";

export interface StateProps {
  card: models.Card;
}

export interface DispatchProps { }

export interface OwnProps {
  id: models.CardId;
  onClickCard(cardId: models.CardId);
  onHoverCard(from: models.CardId, to: models.CardId);
  onClickDeleteCardButton(cardId: models.CardId);
}

export interface DnDProps {
  connectDragSource?: ConnectDragSource;
  connectDropTarget?: ConnectDropTarget;
  isDragging?: boolean;
}

export type Props = OwnProps & StateProps & DispatchProps & DnDProps & React.Props<{}>;

const Card: React.StatelessComponent<Props> = props => (
  props.connectDragSource(
    props.connectDropTarget(
      <li onClick={() => props.onClickCard(props.id)} style={{ opacity: props.isDragging ? 0.4 : 1 }} className="card" >
        <div className="card__title">{props.card.summary}</div>
        <button className="delete-card-button" onClick={e => {
          props.onClickDeleteCardButton(props.id);
          e.stopPropagation();
        }
        }>Delete</button>
      </li>,
    ),
  )
);

interface DnDItem {
  id: models.CardId;
}

// --------------------------------
// react-dnd: Drag Setting
// --------------------------------

const cardSource: DragSourceSpec<Props> = {
  beginDrag: (props: Props): DnDItem => ({
    id: props.id,
  }),
  isDragging: (props: Props, monitor: DragSourceMonitor): boolean => (
    props.id.equals((monitor.getItem() as DnDItem).id)
  ),
};

const collectDragSource: DragSourceCollector = (
  connect: DragSourceConnector,
  monitor: DragSourceMonitor,
): Object => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

const dragSource = DragSource<Props>(DnDItemType.Card, cardSource, collectDragSource);

// --------------------------------
// react-dnd: Drop
// --------------------------------

const cardTarget: DropTargetSpec<OwnProps> = {
  hover(props: OwnProps, monitor: DropTargetMonitor): void {
    const distId = props.id;
    const item = monitor.getItem() as DnDItem;
    const srcId = item.id;
    if (!srcId.equals(distId)) {
      props.onHoverCard(srcId, distId);
    }
  },
};

const collectDropTarget: DropTargetCollector = (
  connect: DropTargetConnector,
): Object => ({
  connectDropTarget: connect.dropTarget(),
});

const dropTarget = DropTarget<Props>(DnDItemType.Card, cardTarget, collectDropTarget);

export default dragSource(dropTarget(Card));
