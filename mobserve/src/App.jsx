import './App.css';
import { Route, Router } from './components/Router';
import { MobjectsPage } from './components/pages/mobjects/MobjectsPage';
import { MobjectPage } from './components/pages/mobject/MobjectPage';

const App = () => {
  return (
    <Router>
      <Route path="/">
        <MobjectsPage />
      </Route>
      <Route path="/m/:id">
        <MobjectPage />
      </Route>
    </Router>
  );
};

export default App;
