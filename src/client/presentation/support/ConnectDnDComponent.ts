import { ConnectDragPreview, ConnectDragSource, ConnectDropTarget } from 'react-dnd';

export const ConnectDnDComponent = <P>(
    connectDragPreview: ConnectDragPreview,
    connectDragSource: ConnectDragSource,
    connectDropTarget: ConnectDropTarget,
) => (component: React.ReactElement<P>) => (
    connectDragPreview(connectDropTarget(connectDragSource(component)))
);
