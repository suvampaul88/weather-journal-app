// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();


/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3002;
/* Spin up the server*/
const server = app.listen(port, listening);

function listening(){
    console.log(`running on localhost: ${port}`);
 };



//get route
app.get('/getWeatherEntry', getWeather);

function getWeather (req, res) {
	res.send(projectData);
}



//post route
app.post('/addWeatherEntry', addWeather)

function addWeather (req, res) {

	newEntry = {
		temperature: req.body.temperature,
		date: req.body.date,
		response: req.body.response
	}	


   projectData["entry"] = newEntry;
   res.send(projectData);
}





