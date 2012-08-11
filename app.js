
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var _ = require('underscore');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'presentation')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


// Define the example sub-applications

var basic = require('./basic');
app.get('/basic', basic.index);
app.get('/basic/app.js', basic.appjs);

var withDeleteWithVoting = require('./with-delete-with-voting');
app.get('/with-delete-with-voting', withDeleteWithVoting.index);
app.get('/with-delete-with-voting/app.js', withDeleteWithVoting.appjs);

var withSummary = require('./with-summary');
app.get('/with-summary', withSummary.index);
app.get('/with-summary/app.js', withSummary.appjs);

var refactor = require('./backbone-refactor');
app.get('/refactor', refactor.index);
app.get('/refactor/app.js', refactor.appjs);
app.get('/refactor/bootstrap.js', refactor.bootstrapjs);


// Using in-process memory to store state. This is 
// for a demo only, do not do this in a real app. Use
// a database.
var posts = [];
var postDefaults = {
  likes: 0,
  dislikes: 0
};

var lastID = 0;
function getID() {
  lastID += 1;
  return lastID;
}

function newPost(data) {
  data = _.defaults(data, postDefaults);
  data.id = getID();

  posts.push(data);
  return data;
}

function deletePost(id) {
  posts = _.filter(posts, function(post) {
    return post.id != id;
  });
}

function getPost(id) {
  return _.find(posts, function(post) {
    return post.id == id;
  });
}

// Define the REST api for creating / deleting posts

app.get('/post', function(req, res) {
  res.json(posts);
});

app.post('/post', function(req, res) {
  var data = newPost(req.body);
  res.json(201, data);
});

app.put('/post/:id', function(req, res) {
  var data = getPost(req.params.id);
  
  if (!data) {
    res.send(404);
  }

  var newValues = _.pick(req.body, 'likes', 'dislikes', 'text');
  data = _.extend(data, newValues);

  res.json(data);
});

app.delete('/post/:id', function(req, res) {
  deletePost(req.params.id);
  res.send(204);
});

// Start up the server.
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
