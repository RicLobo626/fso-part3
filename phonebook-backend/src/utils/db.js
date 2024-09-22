const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB");
  } catch (e) {
    console.error("Couldn't connect to DB: ", e);
    process.exit(1);
  }
};

mongoose.set("strictQuery", false);

module.exports = {
  connectToDB,
};
