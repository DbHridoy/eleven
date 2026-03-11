import { Schema, model } from "mongoose";

const aboutSchema = new Schema(
  {
    singletonKey: {
      type: String,
      default: "default",
      immutable: true,
    },
    about: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

aboutSchema.index({ singletonKey: 1 }, { unique: true });

const About = model("About", aboutSchema);

export default About;
