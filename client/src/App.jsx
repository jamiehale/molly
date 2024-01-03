import './App.css';
import { Route, Router } from './components/Router';
import { PeoplePage } from './components/PeoplePage';
import { Home } from './components/Home';
import { PersonPage } from './components/PersonPage';
import { EventsPage } from './components/EventsPage';
import { LocationsPage } from './components/LocationsPage';

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
      <Route path="/locations">
        <LocationsPage />
      </Route>
    </Router>
  );
};

export default App;
