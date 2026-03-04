import { Schema, model } from "mongoose";

const aboutSchema = new Schema(
  {
    about: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const About = model("About", aboutSchema);

export default About;