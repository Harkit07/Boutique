const User = require("../models/user.js");

module.exports.createUser = async ({
  firstname,
  lastname,
  email,
  password,
  role,
}) => {
  if (!firstname || !email || !password) {
    throw new Error("All fields are required");
  }
  const user = User.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    role,
  });

  return user;
};
