require('dotenv').config();
const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('main', { layout: 'index' });
});

router.post('/', async (req, res) => {
  const response = await axios.get('https://api.openweathermap.org/data/2.5/onecall', { 
    params: {
      lat: req.body.lat,
      lon: req.body.lon,
      appid: process.env.WEATHER_API_KEY,
      exclude: 'minutely,hourly'
    }
  });
  const data = response.data;
  data.current.tempC = Math.round((data.current.temp - 273.15) * 100) / 100;
  data.current.tempF = Math.round((1.8 * (data.current.temp - 273.15) + 32) * 100) / 100;
  console.log(data.current.weather)
  res.render('main', { data, layout: 'index' });
});

module.exports = router;
