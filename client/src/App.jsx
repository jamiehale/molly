import './App.css';
import { Route, Router } from './components/Router';
import { PeoplePage } from './components/pages/people/PeoplePage';
import { Home } from './components/Home';
import { PersonPage } from './components/pages/person/PersonPage';
import { EventsPage } from './components/pages/events/EventsPage';
import { EventPage } from './components/pages/event/EventPage';
import { LocationsPage } from './components/pages/locations/LocationsPage';
import { LocationPage } from './components/pages/location/LocationPage';
import { ArtifactsPage } from './components/pages/artifacts/ArtifactsPage';
import { ArtifactPage } from './components/pages/artifact/ArtifactPage';
import { CollectionsPage } from './components/pages/collections/CollectionsPage';
import { CollectionPage } from './components/pages/collection/CollectionPage';

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
      <Route path="/artifacts/:id">
        <ArtifactPage />
      </Route>
      <Route path="/collections">
        <CollectionsPage />
      </Route>
      <Route path="/collections/:id">
        <CollectionPage />
      </Route>
    </Router>
  );
};

export default App;
