import express from 'express';
import React from 'react';
import createLocation from 'history/lib/createLocation';
import ReactDOMServer from 'react-dom/server';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { match, RouterContext} from 'react-router';
import reducers from './app/reducers';
import promise from 'redux-promise';
import path from 'path';
import routes from './app/routes';

import AppContainer from './app/components/AppContainer';

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(express.static(path.resolve(__dirname, 'dist')));

app.use((req, res) => {
    let location = createLocation(req.url);
    let createStoreWithMiddleware = applyMiddleware(promise)(createStore);
    let store = createStoreWithMiddleware(reducers);
    let initialState = store.getState();
    let initialStateString = JSON.stringify(initialState);
    match({ routes, location }, (error, redirectLocation, renderProps) => {
        let content = ReactDOMServer.renderToString(<Provider store={store}>
                                                      <RouterContext {...renderProps} />
                                                    </Provider>);
        res.render("index", {content: content, initialState: initialStateString});
    });
});

const port = process.env.PORT || 3000;
console.log('listening...' + port);
app.listen(port);