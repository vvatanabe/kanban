import { createServer } from 'http';
import * as path from 'path';
import * as express from 'express';
import { createStore, applyMiddleware } from 'redux';
import ReduxShareServer from './redux-share-server';
import * as reducer from '../shared/reducers';

const server = createServer();
const app = express();
const port = 2000;

const shareServer = new ReduxShareServer(server, {
	debug: true,
	broadcastMode: true
});

const store = createStore(reducer.default, applyMiddleware(shareServer.getReduxMiddleware()));

app
  .use('/redux', shareServer.getExpressMiddleware())
  .use('/javascripts', express.static(path.join(path.resolve(""), 'dist/client/javascripts')))
  .use('/stylesheets', express.static(path.join(path.resolve(""), 'dist/client/stylesheets')))
  .get('*', (req, res) => {
    res.sendFile(path.join(path.resolve(""), 'dist/client/index.html'));
  });

server.on('request', app);

store.dispatch({ type: "@@SERVER-LISTEN-START" });

server.listen(port, function () { 
	console.log('GET http://localhost:'+server.address().port+'/redux/state to view the state');
	console.log('POST http://localhost:'+server.address().port+'/redux/action to post an action to all clients');
});