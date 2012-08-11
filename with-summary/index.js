
exports.index = function(req, res){
  res.sendfile('./with-summary/index.html', function(err) {
    if (err) console.log(err);
  });
};

exports.appjs = function(req, res){
  res.sendfile('./with-summary/app.js', function(err) {
    if (err) console.log(err);
  });
};

