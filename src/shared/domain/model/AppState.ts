import { List } from "immutable";
import Board from "./board/Board";
import Card from "./card/Card";
import Status from "./status/Status";
import StatusLane from "./statuslane/StatusLane";
import UserStory from "./userStory/UserStory";
import Column from "./column/Column";

export interface AppState {
  readonly kanbnaBoards: List<KanbanBoard>;
  readonly scrumBoards: List<ScrumBoard>;
  readonly userStories: List<UserStory>;
  readonly statusLanes: List<StatusLane>;
  readonly columns: List<Column>;
  readonly statuses: List<Status>;
  readonly cards: List<Card>;
}
