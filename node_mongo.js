const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://test:test@cluster0.xzre7sj.mongodb.net/?appName=Cluster0"
MongoClient.connect(url, function(err, db) {
if(err) { return console.log(err); return;}
var dbo = db.db("adoption_center");
var collection = dbo.collection('pets');
console.log("Success!");
db.close();
});
