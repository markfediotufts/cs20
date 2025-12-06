var http = require('http');
var url = require('url');
var port = process.env.PORT || 3000;
//var port = 8080;   //uncomment to run local
console.log("This goes to the console window");
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  urlObj = url.parse(req.url,true)
  if (urlObj.pathname == "/") 
  {
        s = "<form method='get' action='/process'>";
        s += "<input type=\"radio\" id=\"ticker\" name=\"stock\" value=\"Ticker\">"
                + "<label for=\"ticker\">Ticker</label><br>"
                + "<input type=\"radio\" id=\"name\" name=\"stock\" value=\"Name\">"
                + "<label for=\"name\">Name</label><br>";
        s += "Enter a stock ticker symbol or a company name <input type='text' name='id'><br /><input type='submit'></form>"
        res.write(s)
        res.end()
  }
  else if (urlObj.pathname == "/process") {
        id = urlObj.query.id
        res.write ("The id is: " + id)
        res.end();
        console.log('hey')
  }
}).listen(port);
