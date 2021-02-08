/* Global Variables */
const generate = document.getElementById('generate')
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?"
const apiKey = "28736653ad6c42f248388523a9ff3d0e"
let zip = "90291"; // default zip code
const axios = require('axios');

// Create a new date instance dynamically with JS
let day = new Date();
let newDate = (day.getMonth() + 1) + '/'+ day.getDate()+'/'+ day.getFullYear();

//Helper functions
function getWeatherUrl(){
  return baseUrl + "zip=" + zip + "&appid=" + apiKey + "&units=imperial";
}

// get and post tasks
const getWeatherData = async ( url = '')=>{
      const response = await axios.get(url);
      try {
        const newData = await response.json();
        return newData;
      }catch(error) {
        console.log("error", error);
      }
    }
    
    const postData = async ( url = '', data = {})=>{
      const response = await axios.post(url, {
        method: 'POST', 
        credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data) 
    });
    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
      console.log("error", error);
    }
  }
  // main functions
  function preformActionGenerate(){
    const feelingToday =  document.getElementById('plans').value;
    const zipCode = document.getElementById('zip').value;
    // const cityName = document.getElementById('name').value
    if(zipCode !== ""){
      zip = zipCode;
    }    
    getWeatherData(getWeatherUrl())
    .then(function(data){
      postData('../add', {temperature: data.main.temp, date: newDate, user_response: feelingToday, cityName: data.name})
    })
    .then(function(){
      updateUI();
    });
  }
  
  const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      const lastIndex = allData.length -1; 
      document.getElementById('date').innerHTML = allData.date;
      document.getElementById('temp').innerHTML = allData.temperature;
      document.getElementById('content').innerHTML = allData.user_response;
      document.getElementById('cityName').innerHTML = allData.cityName;
    }catch(error){
      console.log("error", error);
    }
  }
  
  //events
  generate.addEventListener('click', function(){
    preformActionGenerate();
  });