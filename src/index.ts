import express, { Request } from "express";
import morgan from "morgan";
import { Person } from "./types";

const app = express();

const persons: Person[] = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

morgan.token("body", (req: Request) => JSON.stringify(req.body));

app.use(express.json());
app.use(morgan(":method :url :body - :response-time ms"));

app.get("/", (_req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/info", (_req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`
  );
});

app.get("/api/persons", (_req, res) => {
  res.json(persons);
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  const generateId = () => Math.floor(Math.random() * 9999);

  if (!body.name) {
    return res.status(400).json({ error: "name is required" });
  }

  if (!body.number) {
    return res.status(400).json({ error: "number is required" });
  }

  const isUnique = !persons.some((p) => p.name === body.name);

  if (!isUnique) {
    return res.status(400).json({ error: "name must be unique" });
  }

  const newPerson: Person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons.push(newPerson);

  return res.json(newPerson);
});

app.get("/api/persons/:id", (req, res) => {
  const id = +req.params.id;
  const person = persons.find((p) => p.id === id);

  if (person) {
    return res.json(person);
  }

  return res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
  const id = +req.params.id;
  const idx = persons.findIndex((p) => p.id === id);

  if (idx > -1) {
    persons.splice(idx, 1);
  }

  return res.status(204).end();
});

const PORT = 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
