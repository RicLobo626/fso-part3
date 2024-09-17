import { Person } from "src/types";
import { Button } from "src/components";

/*** PersonItem ***/

type PersonItemProps = {
  person: Person;
  onDelete: (person: Person) => void;
};

const PersonItem = ({ person, onDelete }: PersonItemProps) => {
  const handleDelete = () => {
    onDelete(person);
  };

  return (
    <li>
      {person.name} - {person.number} <Button onClick={handleDelete} text="Delete" />
    </li>
  );
};

/*** PersonList ***/

type PersonListProps = {
  persons: Person[];
  onDeletePerson: (person: Person) => void;
};

export const PersonList = ({ persons, onDeletePerson }: PersonListProps) => {
  return (
    <ul>
      {persons.map((person) => (
        <PersonItem person={person} key={person.id} onDelete={onDeletePerson} />
      ))}
    </ul>
  );
};
