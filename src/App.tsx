import { Component, lazy } from 'solid-js';
import { Router, Route } from '@solidjs/router';

// routes
const Home = lazy(() => import('./pages/Home/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App: Component = () => {
  return (
    <>
      <Router>
        <Route path="/" component={Home} />
        <Route path="*404" component={NotFound} />
      </Router>
    </>
  );
};

export default App;
