import './App.css';
import { Route, Router } from './components/Router';
import { PeoplePage } from './components/PeoplePage';
import { Home } from './components/Home';
import { PersonPage } from './components/PersonPage';
import { EventsPage } from './components/EventsPage';
import { EventPage } from './components/EventPage';
import { LocationsPage } from './components/LocationsPage';
import { LocationPage } from './components/LocationPage';
import { ArtifactsPage } from './components/ArtifactsPage';
import { ArtifactCollectionsPage } from './components/ArtifactCollectionsPage';
import { ArtifactCollectionPage } from './components/ArtifactCollectionPage';

const App = () => {
  return (
    <Router>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/people">
        <PeoplePage />
      </Route>
      <Route path="/people/:id">
        <PersonPage />
      </Route>
      <Route path="/events">
        <EventsPage />
      </Route>
      <Route path="/events/:id">
        <EventPage />
      </Route>
      <Route path="/locations">
        <LocationsPage />
      </Route>
      <Route path="/locations/:id">
        <LocationPage />
      </Route>
      <Route path="/artifacts">
        <ArtifactsPage />
      </Route>
      <Route path="/artifact-collections">
        <ArtifactCollectionsPage />
      </Route>
      <Route path="/artifact-collections/:id">
        <ArtifactCollectionPage />
      </Route>
    </Router>
  );
};

export default App;
