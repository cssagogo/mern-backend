require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes);

app.use("/api/users", usersRoutes);

app.use("/", (req, res, next) => {
  return next(new HttpError("Could not fine this route.", 404));
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred." });
});

mongoose
.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_AUTH}@cluster0.hphksck.mongodb.net/places?retryWrites=true&w=majority`)
.then(() => {
  app.listen(5000);
})
.catch((error) => {
  console.log(error);
});

