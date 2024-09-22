import { Button } from ".";

export const PersonForm = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="person-name">Name:</label>
        <input id="person-name" name="name" required />
      </div>

      <div>
        <label htmlFor="person-number">Number:</label>
        <input id="person-number" name="number" type="tel" required />
      </div>

      <Button type="submit" text="Add" />
    </form>
  );
};
