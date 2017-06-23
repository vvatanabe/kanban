import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as localforage from 'localforage';
import 'isomorphic-fetch';
import configStore from './store';

import * as uuid from 'uuid';
import { Card, List } from '../shared/models';

import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { Switch } from 'react-router';
import { Link, Route } from 'react-router-dom';
import NotFound from './components/NotFound';
import Header from './components/Header';
import Home from './containers/Home';
import Bord from './containers/Bord';

const history = createBrowserHistory()

const localStore = localforage.createInstance({
    name: 'kanban',
});

function onReset(): any {
    localStore.clear();
    window.location.reload();
}


// localStore.getItem('state')
fetch("/redux/state")
    .then(value => (value = value || undefined))
    .then(value => value.json())
    .then(value => configStore(value), err => configStore(null))
    .then(store => {
        ReactDOM.render(
            <div className="react-root">
                <Provider store={store}>
                    <Router history={history}>
                        <div className="backlog-kanban">
                            <Header title="WIP - Shared Task Board" />
                            <Switch>
                                <Route exact path='/' render={ routeProps => (<Home {...routeProps} onReset={onReset} />) } />
                                <Route path='/bord/:bordId' component={Bord} />
                                <Route component={ NotFound }/>
                            </Switch>
                        </div>
                    </Router>
                </Provider>
            </div>,
            document.querySelector('#root')
        );
        store.subscribe(() => {
            localStore.setItem('state', store.getState());
        });
    });