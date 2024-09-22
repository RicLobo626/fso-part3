require("dotenv").config();
require("express-async-errors");
const express = require("express");
const morgan = require("morgan");
const Person = require("./models/Person.js");
const { connectToDB } = require("./utils/db.js");

const app = express();

morgan.token("body", (req) => JSON.stringify(req.body));
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

app.put("/api/persons/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const person = await Person.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (person) {
    return res.json(person);
  }

  return res.status(404).end();
});

app.delete("/api/persons/:id", async (req, res) => {
  const id = req.params.id;

  await Person.findByIdAndDelete(id);

  res.status(204).end();
});

const unknownEndpointHandler = (_req, res) => {
  res.status(404).json({ error: "unknown endpoint" });
};

const errorHandler = (error, _req, res, next) => {
  switch (error.name) {
    case "CastError":
      return res.status(400).json({ error: "malformatted id" });
    case "ValidationError":
      return res.status(400).json({ error: error.message });
  }

  return next(error);
};

app.use(unknownEndpointHandler);
app.use(errorHandler);

const init = async () => {
  await connectToDB();

  const PORT = process.env.PORT || 3001;

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

void init();
