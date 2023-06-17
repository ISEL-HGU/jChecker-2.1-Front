import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Index from './Home';
import EntranceClass from './modules/views/EntranceClass';
import EntranceInstructor from './modules/views/EntranceInstructor';
import SectionClass from './modules/components/classes/SectionClass'
import SectionClassForInst from './modules/components/classes/SectionClassForInst';
import SectionError from './modules/components/classes/SectionError';
import ResultProcess from './modules/components/classes/ResultProcess';
import ResultDetail from './modules/components/classes/ResultDetail';

import EntranceTest from './modules/views/EntranceTest';
import SectionClassTest from './modules/components/classes/SectionClassTestForInst'

//const theme = unstable_createMuiStrictModeTheme();

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/jchecker2.1" component={Index} />
        <Route exact path="/jchecker2.1/classes" component={EntranceClass} />
        <Route exact path="/jchecker2.1/classes/:token" component={SectionClass} />
        <Route exact path="/jchecker2.1/classes/:token/success" component={ResultProcess} />
        <Route exact path="/jchecker2.1/classes/:token/success/details" component={ResultDetail} />
        <Route exact path="/jchecker2.1/instructors" component={EntranceInstructor} />
        <Route exact path="/jchecker2.1/instructors/results" component={SectionClassForInst} />
        <Route exact path="/jchecker2.1/error" component={SectionError} />

        <Route exact path="/jchecker2.1/tests" component={EntranceTest} />
        <Route exact path="/jchecker2.1/tests/:token" component={SectionClassTest} />

        <Redirect path="*" to="/jchecker2.1" />
      </Switch>
    </Router>
  );
}

export default App;
