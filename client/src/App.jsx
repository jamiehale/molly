import "./App.css";
import { Route, Router } from "./components/Router";
import { PeoplePage } from "./components/PeoplePage";
import { Home } from "./components/Home";
import { PersonPage } from "./components/PersonPage";

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
    </Router>
  );
};

export default App;
