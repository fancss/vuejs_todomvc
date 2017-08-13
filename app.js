var express = require('express');
var app = express();
var fs = require("fs");
var url = require("url");

app.use(express.static('www'));
//node写接口，这个是对文件的操作 和对数据库操作不同 在于它是先读再改再写，套路类似于本地存储
//查
app.get("/getAll",function(req,res){
    fs.readFile("./data/todos.json", function(err,data){
        res.json({"results":JSON.parse(data.toString()).results});
    });
});
//增
app.get("/add",function(req,res){
    var title = url.parse(req.url,true).query.title;
    //先读再写
    fs.readFile("./data/todos.json", function(err,data){
        var arr = JSON.parse(data.toString()).results;
        var id = Date.parse(new Date()) + "" + parseInt(Math.random() * 1000);
        arr.push({"id":id, "title":title,"done":false});
        fs.writeFile("./data/todos.json", JSON.stringify({"results":arr}),function(err,data){
            res.json({"result": "ok", "id" : id});
        })
    })
});
//改
app.get("/changedone",function(req,res){
    var id = url.parse(req.url,true).query.id;
    var done = url.parse(req.url,true).query.done == 1 ? true : false;
    //先读再写
    fs.readFile("./data/todos.json", function(err,data){
        var arr = JSON.parse(data.toString()).results;
        arr= arr.map((item)=>{
            if(item.id == id){
                item.done = done;
            }
            return item;
        });
        fs.writeFile("./data/todos.json", JSON.stringify({"results":arr}),function(err,data){
            res.send("ok");
        })
    })
});
app.get("/changetitle",function(req,res){
    var id = url.parse(req.url,true).query.id;
    var title = url.parse(req.url,true).query.title;
    //先读再写
    fs.readFile("./data/todos.json", function(err,data){
        var arr = JSON.parse(data.toString()).results;
        arr= arr.map((item)=>{
            if(item.id == id){
                item.title = title;
            }
            return item;
        });
        fs.writeFile("./data/todos.json", JSON.stringify({"results":arr}),function(err,data){
            res.send("ok");
        })
    })
});
//删
app.get("/del",function(req,res){
    var id = url.parse(req.url,true).query.id;
    //先读再写
    fs.readFile("./data/todos.json", function(err,data){
        var arr = JSON.parse(data.toString()).results;
        arr= arr.filter((item)=>{
            return item.id != id;
        });
        fs.writeFile("./data/todos.json", JSON.stringify({"results":arr}),function(err,data){
            res.send("ok");
        })
    })
});

var server = app.listen(3000, function () {
  console.log("运行在3000端口");
});