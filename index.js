let express = require("express");
let users = require("./state").users;

const app = express();



//use this
app.get ("/users", function(req,res,next){
    return res.send(users);
})

//instead of this>>

//hey express, anytime you recieve a request,
//use this function to decide what to repond with
app.use(function(req,res,next){
    if(req.path == "/users" && req.method == "GET") {
        return res.send(users);
    }
    if(req.path == "/users/1" && req.method == "GET") {
        return res.send(users[0]);
    }
    if(req.path == "/users" && req.method == "POST") {
        users.push({_id: "6", name:"walker", occupation:"web developer", avatar:"#"});
        return res.send(users);
    }
    if(req.path == "/users/1" && req.method == "PUT") {
        (users[0].name = "John" );
        return res.send(users);
    }
    if(req.path == "/users/1" && req.method == "DELETE") {
        users.pop();
        return res.send("Deleted.");
    }
   return res.send(users);
 });
 

app.listen(3002, (err) => {
    if (err) {
        return console.log("Error", err);
    }
    console.log("Web server is now living in apartment 3002");
});