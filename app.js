const path = require("path");

const express = require("express");
const hbs = require("hbs");

const geoCode = require("./src/utils/geocode");
const foreCast = require("./src/utils/forecast");

const app = express();
const port = process.env.PORT || 8000;

console.log(__dirname);
const publicDirectoryPath = path.join(__dirname, "./public");

const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");

hbs.registerPartials(partialsPath);

app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(publicDirectoryPath));
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",

    name: "Adedayo",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Adedayo",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "this is some helpful exampke",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address",
    });
  }
  // res.send({
  //   forecast: "It is going to rain",
  //   location: "Magboro",
  //   address: req.query.address,
  // });

  geoCode(req.query.address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({ error: err });
    }

    foreCast(latitude, longitude, (err, foreCastData) => {
      if (err) {
        return res.send({ error: err });
      }

      res.json({
        foreCast: foreCastData,
        address: req.query.address,
        location,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.json({
      error: "You must provide a search term",
    });
  }
  console.log(req.query);

  res.json({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("notfound", {
    title: "404",
    errorMessage: "Article page not found",
  });
});

app.get("*", (req, res) => {
  res.render("notfound", {
    title: "404",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => console.log("App is running"));
