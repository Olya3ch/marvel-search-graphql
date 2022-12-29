import mongoose from "mongoose";
import { createSchema, Type, typedModel } from "ts-mongoose";

export const connectToDatabase = async () => {
  await mongoose.connect(process.env.DB_CONNECTION_STRING!, {
    connectTimeoutMS: 2000,
  });
  console.log("Connected to db");
};

const ReviewSchema = createSchema({
  comicId: Type.number({ required: true }),
  review: Type.string({ required: true }),
});

export const Review = typedModel("Review", ReviewSchema);
