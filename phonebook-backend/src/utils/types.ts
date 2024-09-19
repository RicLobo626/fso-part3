import { Types } from "mongoose";

export interface IPerson {
  id: Types.ObjectId;
  name: string;
  number: string;
}
