"use strict";

var Chance = require("chance");

var chance = new Chance();

// console.log(chance.age({type:"adult"}));

// console.log(chance.floating({min:30000, max:50000, fixed:0}));

for(var i=0;i < 10000; i++){
  console.log("Gender:" + chance.gender());
  var income = chance.floating({min:70000, max:250000, fixed:0});
  var multiplier = chance.weighted([2,3,4], [25,50,25]);
  console.log("Income: " + income );
  console.log("House Value: " + income * multiplier);
  console.log("Age: " + chance.weighted([25,30,35,40], [1,2,3,4])); 
  console.log("Event Date: " + chance.date({year:2014, month:4, string:true}));
}
