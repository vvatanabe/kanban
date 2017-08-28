
import * as React from "react";
import {
  ConnectDragSource, ConnectDropTarget, DragSource, DragSourceCollector, DragSourceConnector, DragSourceMonitor,
  DragSourceSpec, DropTarget, DropTargetCollector, DropTargetConnector, DropTargetMonitor, DropTargetSpec,
} from "react-dnd";
import { CardId, ColumnId, StatusLaneId } from "../../../../shared/domain/model";
import * as model from "../../../../shared/domain/model";
import { DnDItemType } from "../../constants";
import { ColumnConstructor } from '../../../../shared/domain/model/column/Column';
import { StatusLaneId } from '../../../../shared/domain/model/statuslane/StatusLaneId';

export interface StateProps {
  card?: model.Card;
}

export interface OwnProps {
  id: CardId;
  parentId: ColumnId | StatusLaneId;
  onClickCard(cardId: CardId);
  onHoverCard(hoverCardId: CardId, hoverCardParentId: ColumnId | StatusLaneId, beHoveredCardId: CardId);
  onClickDeleteCardButton(cardId: CardId);
}

export interface DnDProps {
  connectDragSource?: ConnectDragSource;
  connectDropTarget?: ConnectDropTarget;
  isDragging?: boolean;
}

export type Props = OwnProps & StateProps & DnDProps & React.Props<{}>;

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
  cardId: CardId;
  parentId: ColumnId | StatusLaneId;
}

// --------------------------------
// react-dnd: Drag Setting
// --------------------------------

const cardSource: DragSourceSpec<Props> = {
  beginDrag: (props: Props): DnDItem => ({
    cardId: props.id,
    parentId: props.parentId,
  }),
  isDragging: (props: Props, monitor: DragSourceMonitor): boolean => (
    props.id.equals((monitor.getItem() as DnDItem).cardId)
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
    const beHoveredCardId = props.id;
    const hover = monitor.getItem() as DnDItem;
    if (!hover.cardId.equals(beHoveredCardId)) {
      props.onHoverCard(hover.cardId, hover.parentId, beHoveredCardId);
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
