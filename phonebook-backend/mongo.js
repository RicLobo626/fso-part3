const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("password is required");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://riclobo:${password}@cluster0.dtwsh.mongodb.net/fsoPhonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const logPersons = async () => {
  const persons = await Person.find();

  if (persons.length === 0) {
    console.log("phonebook is empty");
  } else {
    console.log("phonebook:");
    persons.forEach((p) => console.log(p.name, p.number));
  }
};

const addPerson = async () => {
  const [name, number] = process.argv.slice(3);

  const person = new Person({ name, number });

  await person.save();

  console.log(`added ${name} number ${number} to phonebook`);
};

(async () => {
  if (process.argv.length < 5) {
    await logPersons();
  } else {
    await addPerson();
  }

  mongoose.connection.close();
})();
