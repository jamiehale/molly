import "./App.css";
import { Route, Router } from "./components/Router";
import { PeoplePage } from "./components/PeoplePage";
import { Home } from "./components/Home";

const App = () => {
  return (
    <Router>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/people">
        <PeoplePage />
      </Route>
    </Router>
  );
};

export default App;
