import { Document, Schema, Types, model } from "mongoose";
import { IPerson } from "../utils/types";

const personSchema = new Schema<IPerson>({
  name: { type: String, minlength: 3, required: true },
  number: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => /^\d{2,3}-\d{5,}$/.test(v),
      message: ({ value }) => `${value} is not a valid phone number!`,
    },
  },
});

personSchema.set("toJSON", {
  transform: (_doc: Document, returnObj) => {
    returnObj.id = returnObj._id as Types.ObjectId;
    delete returnObj._id;
    delete returnObj.__v;
  },
});

export default model<IPerson>("Person", personSchema);
