import { List } from "immutable";
import Board from "./board/Board";
import Card from "./card/Card";
import Status from "./status/Status";
import StatusLane from "./statuslane/StatusLane";
import UserStory from "./userStory/UserStory";
import Column from "./column/Column";

export interface AppState {
  readonly boards: List<Board>;
  readonly userStories: List<UserStory>;
  readonly statusLanes: List<StatusLane>;
  readonly columns: List<Column>;
  readonly statuses: List<Status>;
  readonly cards: List<Card>;
}
