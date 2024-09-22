export const Filter = ({ value, onChange }) => {
  return (
    <label htmlFor="filter">
      Filter by name
      <input onChange={onChange} id="filter" value={value} />
    </label>
  );
};
