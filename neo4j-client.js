"use strict";

var neo4j = require("neo4j");
var db = new neo4j.GraphDatabase("http://localhost:7474");
var Node = neo4j.Node;
var csv = require("fast-csv");
var sprintf = require("sprintf-js").sprintf;


var personNode = {
  name:"Scott"
}

function buildCreateCypherStatement(label, query, params){
  var query = sprintf('%s (%s %s)', "CREATE", label, query);
  var result = {
    query: query
  }
  return result;
}


function cypherifyJson(data){
  return JSON.stringify(data).replace(/\"([^(\")"]+)\":/g,"$1:");
}

//console.log(JSON.stringify(createCypherQuery("CREATE", "sb:Person", cypherifyJson(personNode), null)));

db.cypher(buildCreateCypherStatement('sb:Person', cypherifyJson(personNode)), function(err,res){
  if(err) throw err;
  console.log(JSON.stringify(res));
})

// db.cypher({
//   query: 'CREATE (sb:Person {name:"Scott", from:"Raleigh", klout:99})'
// }, function(err, results){
//   if(err) throw err;
//   console.log(JSON.stringify(results[0]))
// });

// db.cypher({
//   query: 'MATCH (ee:Person) WHERE ee.name = "Scott" RETURN ee'
// }, function(err, results){
//   if(err) throw err;
//   console.log(JSON.stringify(results));
// })


