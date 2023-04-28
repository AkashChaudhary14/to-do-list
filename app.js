const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = 3000
var items = ["Eat", "sleep", "repeat"];
let workItems = [];


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get('/', function(req, res) {

var today = new Date();
var option = {
    weekday: "long",
    day: "numeric",
    month: "long"
};

var day= today.toLocaleDateString("en-US", option);


res.render("lists", {ListTitle: day, newListItems: items});

});

app.post("/", function(req, res){
  var  item = req.body.newItem;

if(req.body.lists === "Work"){
  workItems.push(item);
  res.redirect("/work");
}else
{
  items.push(item);
  res.redirect("/");
}

  
});



app.get("/work", function(req, res){
res.render("lists", {ListTitle:"Work List", newListItems: workItems });
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(port, () => console.log(`server is running without any problem on ${port}!`))