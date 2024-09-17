import axios from "axios";
import { Person, PersonFormValues } from "src/types";

const baseURL = "/api/persons";

export const getPersons = async () => {
  const { data } = await axios.get(baseURL);

  return data;
};

export const createPerson = async (person: PersonFormValues) => {
  const { data } = await axios.post(baseURL, person);

  return data;
};

export const updatePerson = async (id: Person["id"], person: PersonFormValues) => {
  const { data } = await axios.put(`${baseURL}/${id}`, person);

  return data;
};

export const deletePerson = (id: Person["id"]) => {
  return axios.delete(`${baseURL}/${id}`);
};
