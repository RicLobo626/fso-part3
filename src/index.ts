import express from "express";

const app = express();

const PORT = 3000;

const persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (_req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/api/persons", (_req, res) => {
  res.json(persons);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
