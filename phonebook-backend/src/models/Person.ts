import { Schema, model } from "mongoose";
import { IPerson } from "../utils/types";

const personSchema = new Schema<IPerson>({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (_doc, returnObj) => {
    returnObj.id = returnObj._id.toString();
    delete returnObj._id;
    delete returnObj.__v;
  },
});

export default model<IPerson>("Person", personSchema);
