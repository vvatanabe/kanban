import { createServer } from 'http';
import * as path from 'path';
import * as express from 'express';
import { createStore, applyMiddleware } from 'redux';
import ReduxShareServer from './redux-share-server';
import * as reducer from '../shared/reducers';
import * as redis from "redis";

declare var STATIC_PATH: string;

const  redisClient = redis.createClient();

const server = createServer();
const app = express();
const port = 2000;

const shareServer = new ReduxShareServer(server, {
	debug: true,
	broadcastMode: true
});

redisClient.get('appState', (err, val) => {
    if(err) return console.log(err);
    const data = JSON.parse(val);
    const store = createStore(reducer.default, !!data ? data : {}, applyMiddleware(shareServer.getReduxMiddleware()));
    store.dispatch({ type: "@@SERVER-LISTEN-START" });
    store.subscribe(() => {
      redisClient.set('appState', JSON.stringify(store.getState()));
    })
});

const staticRootPath = path.join(path.resolve(""), STATIC_PATH);
app
  .use('/redux', shareServer.getExpressMiddleware())
  .use('/javascripts', express.static(`${staticRootPath}/javascripts`))
  .use('/stylesheets', express.static(`${staticRootPath}/stylesheets`))
  .get('*', (req, res) => {
    res.sendFile(`${staticRootPath}/index.html`);
  });
server.on('request', app);
server.listen(port, ()  => { 
	console.log('GET http://localhost:'+server.address().port+'/redux/state to view the state');
	console.log('POST http://localhost:'+server.address().port+'/redux/action to post an action to all clients');
});