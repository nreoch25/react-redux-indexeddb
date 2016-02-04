import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AppContainer from './components/AppContainer';
import Index from './components/Index';
import Arts from './components/Arts';
import News from './components/News';
import Sports from './components/Sports';
import Story from './components/Story';
import NotFound from './components/NotFound';

export default (
    <Route path='/' component={AppContainer}>
        <IndexRoute component={Index} />
        <Route path="arts" section="Arts" component={Arts} />
        <Route path="arts/:id" component={Story} />
        <Route path="news" section="News" component={News} />
        <Route path="news/:id" component={Story} />
        <Route path="sports" section="Sports" component={Sports} />
        <Route path="sports/:id" component={Story} />
        <Route path="*" component={NotFound} />
    </Route>
);