var axios = require("axios").default;

var options = {  // Statistics
    method: 'GET',
    url: 'https://yh-finance.p.rapidapi.com/stock/v3/get-statistics',
    params: {symbol: 'TSLA'},
    headers: {
      'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
      'x-rapidapi-key': 'b223b82efbmsh884444e64254502p1af337jsn5038b48422e6'
    }
  };


axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
