import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { PersonForm, PersonList, Filter, AlertBar } from "src/components";
import { Person, PersonFormValues, Alert } from "src/types";
import {
  getPersons,
  createPerson,
  deletePerson,
  updatePerson,
} from "src/services/persons";
import "./index.scss";
import { handleError } from "./helpers/errorHelper";

const App = () => {
  const [filter, setFilter] = useState("");
  const [persons, setPersons] = useState<Person[]>([]);
  const [alert, setAlert] = useState<Alert>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPersons();
        setPersons(data);
      } catch (e) {
        handleError(e);
      }
    })();
  }, []);

  const filteredPersons = persons.filter(({ name }) => {
    return name.toLowerCase().includes(filter.toLowerCase().trim());
  });

  const handleChangeFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleCloseAlert = () => setAlert(null);

  const handleDeletePerson = async (person: Person) => {
    if (!window.confirm(`Delete ${person.name}?`)) {
      return;
    }

    try {
      await deletePerson(person.id);
      setPersons(persons.filter(({ id }) => id !== person.id));
      setAlert({ message: `Deleted ${person.name}`, type: "success" });
    } catch (e) {
      const { message } = handleError(e);

      setAlert({
        message,
        type: "error",
      });
    }
  };

  const handleCreatePerson = async (body: PersonFormValues) => {
    const createdPerson = await createPerson(body);

    setPersons(persons.concat(createdPerson));

    setAlert({ message: `Added ${createdPerson.name}`, type: "success" });
  };

  const handleUpdatePerson = async (id: Person["id"], body: PersonFormValues) => {
    const updatedPerson = await updatePerson(id, body);

    setPersons(persons.map((p) => (p.id === updatedPerson.id ? updatedPerson : p)));

    setAlert({ message: `Updated ${updatedPerson.name}`, type: "success" });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    const values = Object.fromEntries(formData.entries()) as PersonFormValues;

    const person = persons.find(({ name }) => name === values.name);

    try {
      const isUpdate =
        person &&
        window.confirm(
          `${values.name} is already added to phonebook, replace the old number with a new one?`
        );

      if (isUpdate) {
        await handleUpdatePerson(person.id, values);
      } else {
        await handleCreatePerson(values);
      }

      formEl.reset();
    } catch (e) {
      const { message } = handleError(e);

      setAlert({
        message,
        type: "error",
      });
    }
  };

  return (
    <>
      <AlertBar alert={alert} onClose={handleCloseAlert} />

      <main>
        <section>
          <h1>Phonebook</h1>
          <Filter onChange={handleChangeFilter} value={filter} />
        </section>

        <section>
          <h2>Add new</h2>
          <PersonForm onSubmit={handleSubmit} />
        </section>

        <section>
          <h2>Numbers</h2>
          <PersonList
            persons={filteredPersons}
            onDeletePerson={handleDeletePerson}
          />
        </section>
      </main>
    </>
  );
};

export default App;
