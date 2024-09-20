import { connect, set } from "mongoose";

export const connectToDB = async () => {
  try {
    await connect(process.env.MONGODB_URI!);
    console.log("Connected to DB");
  } catch (e) {
    console.error("Couldn't connect to DB: ", e);
    throw e;
  }
};

set("strictQuery", false);
