"use strict";

var neo4j = require("neo4j");
var db = new neo4j.GraphDatabase("http://localhost:7474");

// db.cypher({
//   query: 'CREATE (sb:Person {name:"Scott", from:"Raleigh", klout:99})'
// }, function(err, results){
//   if(err) throw err;
//   console.log(JSON.stringify(results[0]))
// });

db.cypher({
  query: 'MATCH (ee:Person) WHERE ee.name = "Scott" RETURN ee'
}, function(err, results){
  if(err) throw err;
  console.log(JSON.stringify(results));
})