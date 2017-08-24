import { List } from "immutable";
import { Card, Column, KanbanBoard, Project, ScrumBoard, Status, UserStory } from "./";

export interface AppState {
  readonly projects: List<Project>;
  readonly kanbnaBoards: List<KanbanBoard>;
  readonly scrumBoards: List<ScrumBoard>;
  readonly userStories: List<UserStory>;
  readonly columns: List<Column>;
  readonly statuses: List<Status>;
  readonly cards: List<Card>;
}
