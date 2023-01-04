const express = require ("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req,res){

    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req,res){

     const cityName =req.body.cityName;
     const key = "025ddf250b4a466a84d154207230101";
const url = "https://api.weatherapi.com/v1/current.json?key="+ key+"&q="+cityName;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on('data',function(data){
            const weatherData = JSON.parse(data);
            const city = weatherData.location.name;
            const weatherDescription = weatherData.current.condition.text;
            const temp = weatherData.current.temp_c;
            const icon = weatherData.current.condition.icon;
        res.write("<h1>The temperature in "+city+" is "+temp +"°C.</h1>");
        res.write("<p>The Weather Forecast is "+weatherDescription+"</p>");
        res.write("<img src="+ icon +">")
        res.send()
        })
    })
})

  

app.listen(3000, function(){
    console.log("Server running on port 3000");}
)
