import axios from "axios";

const baseURL = "/api/persons";

export const getPersons = async () => {
  const { data } = await axios.get(baseURL);

  return data;
};

export const createPerson = async (person) => {
  const { data } = await axios.post(baseURL, person);

  return data;
};

export const updatePerson = async (id, person) => {
  const { data } = await axios.put(`${baseURL}/${id}`, person);

  return data;
};

export const deletePerson = (id) => {
  return axios.delete(`${baseURL}/${id}`);
};
