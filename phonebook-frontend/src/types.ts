export type Person = {
  id: number;
  name: string;
  number: string;
};

export type PersonFormValues = Omit<Person, "id">;

export type Alert = {
  message: string;
  type: "success" | "error";
} | null;
