import { Schema, model } from "mongoose";
import { IPerson } from "../utils/types";

const personSchema = new Schema<IPerson>({
  name: { type: String, minlength: 3, required: true },
  number: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^\d{2,3}-\d{5,}$/.test(v),
      message: ({ value }) => `${value} is not a valid phone number!`,
    },
  },
});

personSchema.set("toJSON", {
  transform: (_doc, returnObj) => {
    returnObj.id = returnObj._id.toString();
    delete returnObj._id;
    delete returnObj.__v;
  },
});

export default model<IPerson>("Person", personSchema);
