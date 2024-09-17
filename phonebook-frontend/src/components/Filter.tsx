import { ChangeEvent } from "react";

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Filter = ({ value, onChange }: Props) => {
  return (
    <label htmlFor="filter">
      Filter by name
      <input onChange={onChange} id="filter" value={value} />
    </label>
  );
};
