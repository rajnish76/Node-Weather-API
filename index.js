const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.post("/weather", (req, res, next) => {
  const { location } = req.body;
  if (!location) {
    res.status(500).json({ error: "Please provide an address" });
  } else {
    geoCode(location, (err, { latitude, location, longitude }) => {
      if (err) return res.status(500).json({ error: err });

      forecast(longitude, latitude, (err, forecastData) => {
        if (err) return res.json({ error: err });
        res.json({ forecastData, location });
      });
    });
  }
});

app.listen(3000, () => console.log("listing at Port 3000"));
