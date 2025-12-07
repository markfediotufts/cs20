var http = require('http');
var url = require('url');
const MongoClient = require('mongodb').MongoClient;
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
        type = urlObj.query.stock;
        
        const mongourl = "mongodb+srv://test:test@cluster0.xzre7sj.mongodb.net/?appName=Cluster0";
        MongoClient.connect(mongourl, { useUnifiedTopology: true }, function(err, db) {
                if(err) { 
                        console.log("Connection err: " + err); 
                        res.end();
                        return; 
                }

                var dbo = db.db("Stock");
                var coll = dbo.collection('PublicCompanies');
                
                var query = {};
                if (type == "Ticker") {
                        query = { ticker : id }
                } else {
                        query = { name : id }
                }
                coll.find(query).toArray(function(err, items) {
                if (err) {
                        console.log("Error: " + err);
                } 
                else 
                {
                        console.log("Companies matching your query:\n");
                        if (items.length > 0) {
                                res.write("<h3>Matching Results:</h3><ul>");
                                for (i=0; i<items.length; i++) {
                                        // writes to Heroku console
                                        console.log(i + ": " + items[i].name + " (" + items[i].ticker + ") --- $" + items[i].price); 
                                        // writes to site
                                        res.write(`<li>${items[i].name} (${items[i].ticker}) --- $${items[i].price}</li>`);
                                }
                                res.write("</ul>");
                        } else {
                                console.log("No results found for that ticker/name.")
                                res.write("<p>No results found for that ticker/name.</p>");
                    }
                }   
                        db.close();
                        res.end();
                });  //end find    

            });  //end connect
        
        }
}).listen(port);
