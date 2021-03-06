
/*
 * GET users listing.
 */

var redis = require("redis"),
    client = redis.createClient();

exports.list = function(req, res){
  res.send("respond with a resource");
};


exports.data = function(req, res){
  res.render('page', { title: 'New data page ' });
};

exports.view = function(req, res){
  res.render('view', { title: 'View page ',rtnVal:{} });
};


exports.saveData = function(req, res) {
  var newDatum = {};
  // get from the request params
  newDatum.name = req.body['name'];
  console.log('got the name '+newDatum.name);

  newDatum.num = req.body['num'];
  console.log('got the number '+newDatum.num);

  // add new id field
  newDatum.id = newDatum.name.replace(" ", "-");
 
  //save it in redis  
  client.hset(newDatum.id, "name", newDatum.name);
  client.hset(newDatum.id, "num", newDatum.num);
  
  res.render('page', {
      title: 'View value',
      rtnVal: 'val stored succesfully'
    });
   
   //  res.redirect("back");
};


exports.viewDatum = function(req, res){
  var newVal = {};
  var retnVal= [];

  newVal.name = req.body['name'];
  if(newVal.name.length !=0) {

  console.log('name got formed req '+ newVal.name);
  newVal.id = newVal.name.replace(" ", "-");
  console.log('formed id '+newVal.id);

  client.hgetall(newVal.id, function(err, objs) {
  // console.log('got the objs '+objs['name'])
    for(var k in objs) {

     console.log('got key '+k);
      var tempVal = {
        text: objs[k]
      };
     console.log('got val '+tempVal.text);
     retnVal.push(tempVal);
    }

  console.log(' now rendring ');
   res.render('view', {
      title: 'View value',
      rtnVal: retnVal
    });
 });
  } else {
console.log('redirecting back')
    res.redirect('back')
  }

};
