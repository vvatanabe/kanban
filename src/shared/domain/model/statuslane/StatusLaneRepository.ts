import { StatusLane, StatusLaneId } from "../../shared/models";
import store from "../store";

export function findById(id: StatusLaneId): StatusLane {
    return store.getState().statusLanes.find(lane => lane.id.equals(id));
}

export function create() {
    store.dispatch(statusLanesAction.createStatusLane());
}

this.dispatch(statusLanesAction.detachStatusLaneFromBoard(this.boardId, laneId));
this.dispatch(statusLanesAction.deleteStatusLane(laneId));
this.dispatch(cardsAction.deleteCards(statusLaneStore.findById(laneId).cardIds));