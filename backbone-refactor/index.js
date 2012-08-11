
exports.index = function(req, res){
  res.sendfile('./backbone-refactor/index.html', function(err) {
    if (err) console.log(err);
  });
};

exports.appjs = function(req, res){
  res.sendfile('./backbone-refactor/app.js', function(err) {
    if (err) console.log(err);
  });
};

exports.bootstrapjs = function(req, res){
  res.sendfile('./backbone-refactor/bootstrap.js', function(err) {
    if (err) console.log(err);
  });
};


