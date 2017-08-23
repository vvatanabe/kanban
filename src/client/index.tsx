import { List } from "immutable";
import 'isomorphic-fetch';
// import * as localforage from "localforage";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import 'reflect-metadata';
import * as uuid from 'uuid';
import * as models from '../shared/models';
import store from "./store";

import createBrowserHistory from "history/createBrowserHistory";
import { Router } from "react-router";
import { Switch } from "react-router";
import { Link, Route } from "react-router-dom";
import DashBoard from "./presentation/components/dashboard";

const history = createBrowserHistory();
// const localStore = localforage.createInstance({ name: "taskboard" });

ReactDOM.render(
    <div className="react-root">
        <Provider store={store}>
            <Router history={history}>
                <div className="backlog-kanban">
                    <Header title="WIP - Shared Task Board" />
                    <Switch>
                        <Route exact path="/" render={routeProps => (<DashBoard  {...routeProps} />)} />
                        <Route path="/projects/:projectId" component={Project} />
                        <Route path="/projects/:projectId/boards/:boardId" component={Board} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        </Provider>
    </div>,
    document.querySelector("#root"),
);
store.subscribe(() => {
    // localStore.setItem("state", store.getState());
});

fetch("/redux/state")
    .then(value => (value = value || undefined))
    .then(value => value.text())
    .then(jsonToAppState)
    .then(value => store.dispatch(fetchAppState(value)));

function jsonToAppState(json: string): models.AppState {
    const obj = JSON.parse(json);
    return {
        boards: List.of(obj.boards.map(board => models.Board.fromJs(board))),
        storyLanes: List.of(obj.storyLanes.map(storyLane => models.StoryLane.fromJs(storyLane))),
        statusLanes: List.of(obj.statusLanes.map(statusLane => models.StatusLane.fromJs(statusLane))),
        cards: List.of(obj.cards.map(card => models.Card.fromJs(card))),
        statuses: List.of(obj.statuses.map(status => models.Status.fromJs(status))),
    } as models.AppState;
}
