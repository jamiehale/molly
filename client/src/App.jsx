import "./App.css";
import { useGenders } from "./hooks/genders";
import { useApi } from "./hooks/api";
import { usePeople } from "./hooks/people";
import { NewPerson } from "./components/NewPerson";
import { People } from "./components/People";

const App = () => {
  const api = useApi("http://localhost:3000/api", "12345");
  const { people, createPerson } = usePeople(api);
  const { genders } = useGenders(api);

  const handleNewPerson = (givenNames, surname, genderId) => {
    createPerson(givenNames, surname, genderId);
  };

  return (
    <>
      <People people={people} />
      <NewPerson genders={genders} onNewPerson={handleNewPerson} />
    </>
  );
};

export default App;
