import About from "./about.model";

export const getOrCreateVariableConfig = async () => {
  const existing = await About.findOne().lean();

  if (existing) {
    return existing;
  }

  return await About.create({
    about: "",
  });
};
