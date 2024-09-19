import "dotenv/config";
import express, { Request } from "express";
import morgan from "morgan";
import Person from "./models/Person";
import { connectToDB } from "./utils/db";

const app = express();

connectToDB();

morgan.token("body", (req: Request) => JSON.stringify(req.body));
app.use(express.static("dist"));
app.use(express.json());
app.use(morgan(":method :url :body - :response-time ms"));

app.get("/", (_req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/info", async (_req, res) => {
  const persons = await Person.find({});

  res.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`
  );
});

app.get("/api/persons", async (_req, res) => {
  const persons = await Person.find({});

  res.json(persons);
});

app.post("/api/persons", async (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({ error: "name is required" });
  }

  if (!body.number) {
    return res.status(400).json({ error: "number is required" });
  }

  const person = await Person.findOne({ name: body.name });

  if (person) {
    return res.status(400).json({ error: "name must be unique" });
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });

  await newPerson.save();

  return res.json(newPerson);
});

app.get("/api/persons/:id", async (req, res) => {
  const id = req.params.id;

  const person = await Person.findById(id);

  if (person) {
    return res.json(person);
  }

  return res.status(404).end();
});

app.delete("/api/persons/:id", async (req, res) => {
  const id = req.params.id;

  await Person.findByIdAndDelete(id);

  return res.status(204).end();
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
