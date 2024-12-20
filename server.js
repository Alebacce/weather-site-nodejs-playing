const express = require("express")
const axios = require("axios");

var app = express()

// Set the view engine to EJS
app.set("view engine", "ejs");
app.get("/", (request, response) => {
    response.render("index", { weather: null, error: null });
});

// Handle the /weather route
app.get("/weather", async (request, response) => {
    // Get the city from the query parameters
    const city = request.query.city;
    const apiKey = "5a5ac64918dba8310b2d5af5b19ea911";

    const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    let weather;
    let error = null;
    try {
        const response = await axios.get(APIUrl);
        weather = response.data;
    } catch (error) {
        weather = null;
        error = "Error, please try again";
    }
    // Render the index template with the weather data and error message
    response.render("index", { weather, error });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Started application on port ${port}`);
});