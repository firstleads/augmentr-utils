"use strict";

var path = require("path");
var fs = require("fs");
var csv = require("fast-csv");
var async = require("async");
var completedRows = {};
var csvStream = csv.createWriteStream({headers:true});
var outputCsvStream = fs.createWriteStream(process.argv[3]);

csvStream.pipe(outputCsvStream);

function parseMultiples(data) {
  var result = data;
  if(data.indexOf("|") > 0){
    result = data.substring(0, data.indexOf("|"));
  }
  return result;
}


function processFile(file){
  var convertedObj = {};

  csv.fromPath(path.join(__dirname, file), {objectMode:true, headers:true, quoteColumns:true})
  .on("data", function(data){
    convertedObj.fullName = data.FirstName + " " + data.LastName;
    convertedObj.email = parseMultiples(data.Emails);
    convertedObj.phone = parseMultiples(data.Phones);
    csvStream.write(convertedObj);
  })
  .on("end", function(){
  }); 
}


processFile(process.argv[2]);
