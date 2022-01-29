const express = require("express"); //npm install express
const bodyParser = require ("body-parser");//npm install body-parser
const request = require("request");//npm install request
const https = require("https");

const app = express();//for app.get and app.listen
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req,res){
  const first = req.body.first;//we can also write var but since here we are keeping here constant variables so....
  const last = req.body.last;
  const email = req.body.email;
  //console.log(first, last, email);
  var data = {
    members: [
      {email_address:email,
       status:"subscribed",
      merge_fields:{
        FNAME:first,
        LNAME:last
      }}
    ]
  };
  const jsonData = JSON.stringify(data)
  
  const url = "https://us20.api.mailchimp.com/3.0/lists/2c9da0e95c"

  const options = {
     method :"POST",
     auth : "rohan:6ea6d61d10ac2447ffd87463405b7525-us20"
  }
  const request = https.request(url,options,function(response){

    if(response.statusCode == 200){
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();


});




app.post("/failure.html", function(req, res){
   res.redirect("/");
});



app.listen(3000, function(){
  console.log("Server is running on port 3000");
}
);

//API KEY : 6ea6d61d10ac2447ffd87463405b7525-us20
//List ID : 2c9da0e95c
