const express = require("express"); //npm install express
const bodyParser = require ("body-parser");//npm install body-parser
const request = require("request");//npm install request
const https = require("https");

const app = express();//for app.get and app.listen
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
  const first1 = req.body.first;//we can also write var but since here we are keeping here constant variables so....
  const last1 = req.body.last;



  console.log(first1, last1);
  var data = {
    members: [
      {stockname : first1,
        region: last1

      }
    ]
  };
  const jsonData = JSON.stringify(data)

const options = {
	"method": "GET",
	"hostname": "yh-finance.p.rapidapi.com",
	"port": null,
	"path": "/stock/v3/get-historical-data?symbol="+first1+"&region="+last1,
	"headers": {
		"x-rapidapi-host": "yh-finance.p.rapidapi.com",
		//"x-rapidapi-key": "",
		"useQueryString": true
	}
};

const request = https.request(options, function (res) {
	const chunks = [];


	res.on("data", function (chunk) {
		chunks.push(chunk);
	});

	res.on("end", function (data) {
		const body = Buffer.concat(chunks);
    var stokx = body.toString();
    const jstock=JSON.parse(stokx);
    console.log(jstock);
    //res.write(jstock);
    //req.send();
	});
});

request.end();
});
app.listen(3000, function(){
  console.log("Server is running on port 3000");
}
);
