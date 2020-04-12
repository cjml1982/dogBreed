"use strict";

import { stringify } from "querystring";

var express = require("express");
var app = express();
var http = require('http');
var request = require('request');
var bodyParser=require('body-parser');

app.use(bodyParser.json());
// 创建 application/x-www-form-urlencoded 编码解析
app.use(bodyParser.urlencoded({ extended: false }));
/*
* Author: Marty
* time: 2020/4/12
*/
//https://dog.ceo/dog-api/
//https://github.com/ElliottLandsborough/dog-ceo-api
//endpoint: list dog breed
app.get('/dogBreed', function (req:any, res:any) {
    console.log("data\n");
    var url = 'https://dog.ceo/api/breeds/list/all/random/4';
    
    var resbodys:Array<any>=[];
    request(url, function (error:any, response:any, body:any) {
        if (!error && response.statusCode == 200) {
            console.log(body); // 请求成功的处理逻辑
            
            var jbody = JSON.parse(body);

            //the sturcture of res body like bellow
            //{"message":{"chow":[],"havanese":[],"hound":["afghan","basset","blood","english","ibizan","plott","walker"],"leonberg":[]},"status":"success"}
            for (var breeds in jbody.message) {
                var json;
                if(jbody.message[breeds]==null || jbody.message[breeds]==undefined){
                    
                    json = {"breed":breeds,"subbreed":undefined};
                    
                }else{
                    json = {"breed":breeds,"subbreed":jbody.message[breeds]};
                }
                resbodys.push(json);
                
            }
            res.send({"message":resbodys,"status":"success"});
        }else{
            res.send({"message":null,"status":"error"});
        }
    });

});

//endpoint: list dog breed img url
//{"message":{"australian":["shepherd"],"kelpie":[],"retriever":["chesapeake","curly","flatcoated","golden"],"terrier":["american","australian","bedlington","border","dandie","fox","irish","kerryblue","lakeland","norfolk","norwich","patterdale","russell","scottish","sealyham","silky","tibetan","toy","westhighland","wheaten","yorkshire"]},"status":"success"}

app.post('/dogBreedImg', function (req:any, res:any) {
   
    var url:string="";
    console.log(req.body);
    //if breed is null or undefined, return error
    if (req.body.breed==null || req.body.breed==undefined){
        res.send({"message":null,"status":"error"});
    }

    if (req.body.subbreed == null || req.body.subbreed == undefined) {
        url = "https://dog.ceo/api/breed/"+ req.body.breed + "/images/random";
    }
    else {
        url= "https://dog.ceo/api/breed/"+ req.body.breed +"/" + req.body.subbreed +"/images/random";
    }
    
    
    request(url, function (error:any, response:any, body:any) {
        if (!error && response.statusCode == 200) {
            console.log(body); // 请求成功的处理逻辑
            res.send(body);
        }else{
            res.send({"message":null,"status":"error"});
        }
    });
    
});
var server = app.listen(3001, function () {
    console.log('Listen on port 3001');
});
