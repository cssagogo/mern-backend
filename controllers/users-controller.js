const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Adam Youngers",
    email: "adam@ispot.tv",
    password: "test",
  },
];

const getUsers = (req, res, next) => {
  res.status(200).json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  if (hasUser) {
    return next(
      new HttpError("Could not create user, email already exists.", 422)
    );
  }

  const newUser = {
    id: uuid(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(newUser);

  res.status(201).json({ user: newUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const currentUser = DUMMY_USERS.find(
    (u) => u.email === email && u.password === password
  );

  if (!currentUser) {
    return next(new HttpError("Invalid email or password", 404));
  }

  res.status(200).json({ user: "Logged In!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
