
exports.index = function(req, res){
  res.sendfile('./basic/index.html', function(err) {
    if (err) console.log(err);
  });
};

exports.appjs = function(req, res){
  res.sendfile('./basic/app.js', function(err) {
    if (err) console.log(err);
  });
};

