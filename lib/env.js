require("dotenv").config();

export const env = (key) => {
  const value = process.env[key];
  if (!value) {
    alert("key is undefined");
    return;
  }
  return value;
};
