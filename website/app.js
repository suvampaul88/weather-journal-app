/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?'
const apiKey = 'ed650c86619cd9bbda5b6f0961fab6b6';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


document.getElementById('generate').addEventListener('click', performAction)

function performAction(e) {

	const zip =  document.getElementById('zip').value;
	const response = document.getElementById('feelings').value;

	getWeatherData(baseURL, zip, apiKey).then(function(data) {

		postData('/addWeatherEntry', {temperature: data.main.temp, date: newDate, response: response});

	}).then(updateUI);

	document.getElementById('zip').value = '';
	document.getElementById('feelings').value='';
};



//get route
const getWeatherData = async (baseURL, zip, key)=>{

  const res = await fetch(baseURL+'zip='+zip+'&APPID='+key+'&units=imperial')

  try {

    const data = await res.json();
    return data;

  }  catch(error) {

    
    console.log("error", error);
  }
}



//post route
const postData = async (url = '', data = {})=>{

      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {

        const newData = await response.json();
        return newData;
      
      } catch(error) {
      	
      	console.log("error", error);
      
      }
  }





const updateUI = async () => {
  
  const request = await fetch('/getWeatherEntry');
  
  try{

    const allData = await request.json();

    document.getElementById('temp').innerHTML = allData.entry.temperature;
    document.getElementById('date').innerHTML = allData.entry.date;
    document.getElementById('content').innerHTML = allData.entry.response;


  } catch(error){
     
     console.log("error", error);
  }
}


