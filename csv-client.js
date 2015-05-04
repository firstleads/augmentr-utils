"use strict";
var superagent = require("superagent");
var csv = require("fast-csv");
var fs = require("fs");
var eyes = require("eyes");
var path = require("path");
var inputFile = process.argv[2];
var csvStream = csv.createWriteStream({headers:true});
var outputFile = fs.createWriteStream(process.argv[3]);
var host = process.env.HOST;
var port = process.env.PORT;

csvStream.pipe(outputFile);


function locationToString(location) {
  var result = location.city + "| " + location.state + "|" + 
    location.zip + "|" + location.geo.latitude + "|" + location.geo.longitude;
    return result;
}


function photosToString(photos) {
  var result = "";
  if(photos){
    for(var i=0; i<photos.length; i+=1){
      result += photos[i].url + "|";
    }
  }
  return result;
}

function socialProfilesToString(profiles){
  var result = "";
  if(profiles){
    for(var i=0; i< profiles.length;i+=1){
      result += profiles[i].typeName + ", " + profiles[i].url + "|";
    }
  }
  return result;
}

function organizationsToString(orgs){
  var result = "";
  if(orgs){
    for(var i=0; i< orgs.length;i+=1){
      result += orgs[i].name + ", " + orgs[i].title + "," + orgs[i].current + "|";
    }
  }
  return result;

}

function processFile(){
  csv.fromPath(path.join(inputFile), {objectMode:true, headers:true, quoteColumns:true})
  .on("data", function(data){
    console.log(JSON.stringify(data));
    var url = (process.env.HOST || "http://localhost:") + (process.env.PORT || "") + "/leads";
    console.log("sending request to: " + url);
    superagent.post(url)
      .send(data)
      .auth("admin", "admin")
      .end(function(err, res){
        if(err){
          return console.error(err);
        }
        var result = {};
        //console.log(JSON.stringify(res.body, null, 2));
        for(var i=0;i<res.body.length;i+=1){
          for(var property in res.body[i]){
            dumpData(data.fullName, property, res.body[i]);
            // if(res.body[i].hasOwnProperty(property)){
            //   result[property] = res.body[i][property];
            //   //do stuff with each type here
            // }
          }
        }

        //csvStream.write();
        //eyes.inspect((Object.keys(res.body).length === 0)?res.text:res.body);
    });
  })
  .on("end", function(){
  }); 
}


function dumpData(name, type, data){
  console.log("********************** Dumping data for " + name + "  " + type + "******************************************");
  for(var property in data){
    console.log(property);
    if(data.hasOwnProperty(property)){
      console.log("Property: " + JSON.stringify(data[property], null, 2));
    }
  }
}


processFile();


