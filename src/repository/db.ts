import mongoose from "mongoose";
import { createSchema, Type, typedModel } from "ts-mongoose";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING!, {
      connectTimeoutMS: 2000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to db");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit();
  }
};

const ReviewSchema = createSchema({
  comicId: Type.number({ required: true }),
  review: Type.string({ required: true }),
});

export const Review = typedModel("Review", ReviewSchema);
