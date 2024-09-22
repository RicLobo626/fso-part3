import { Button } from ".";

/*** PersonItem ***/

const PersonItem = ({ person, onDelete }) => {
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

export const PersonList = ({ persons, onDeletePerson }) => {
  return (
    <ul>
      {persons.map((person) => (
        <PersonItem person={person} key={person.id} onDelete={onDeletePerson} />
      ))}
    </ul>
  );
};
