import React from 'react';
import './App.scss';
import Nav from './components/nav/Nav';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ForEachVisualizer from './components/for-each-visualizer/ForEachVisualizer';
import CenteredWrapper from './styled-components/CenteredWrapper';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Nav />
      <CenteredWrapper>
        <Switch>
          <Route path="/for-each" component={ForEachVisualizer} />
        </Switch>
      </CenteredWrapper>
    </BrowserRouter>
  );
}

export default App;
