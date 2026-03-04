import { Schema, model } from "mongoose";

const scriptureSchema = new Schema(
  {
    author: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    mode: {
      type: String,
      required: true,
      enum: ["Dr. Bob", "Big Book Thumper"],
    },
    timeOfDay: {
      type: String,
      required: true,
      enum: ["Morning", "Midday", "Night"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Scripture = model("Scripture", scriptureSchema);

export default Scripture;
