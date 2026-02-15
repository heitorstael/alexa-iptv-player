import { Component, lazy } from 'solid-js';
import { Router, Route } from '@solidjs/router';

// routes
const Home = lazy(() => import('./pages/Home/Home'));
// const LoadPlaylist = lazy(() => import('./pages/LoadPlaylist/LoadPlaylist'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

const App: Component = () => {
  return (
    <>
      <Router>
        <Route path="/" component={Home} />
        {/* <Route path="/load-playlist" component={LoadPlaylist} /> */}
        <Route path="*404" component={NotFound} />
      </Router>
    </>
  );
};

export default App;
