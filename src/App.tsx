import { Component, lazy } from 'solid-js';
import { Router, Route } from '@solidjs/router';
import { PlaylistProvider } from './context/Playlist';

// routes
const Home = lazy(() => import('./pages/Home/Home'));
const LoadPlaylist = lazy(() => import('./pages/LoadPlaylist/LoadPlaylist'));
const SelectStream = lazy(() => import('./pages/SelectStream/SelectStream'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

const App: Component = () => {
  return (
    <>
      <PlaylistProvider>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/load-playlist" component={LoadPlaylist} />
          <Route path="/select-stream" component={SelectStream} />
          <Route path="*404" component={NotFound} />
        </Router>
      </PlaylistProvider>
    </>
  );
};

export default App;
