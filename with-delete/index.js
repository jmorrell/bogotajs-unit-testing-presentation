
exports.index = function(req, res){
  res.sendfile('./with-delete/index.html', function(err) {
    if (err) console.log(err);
  });
};

exports.appjs = function(req, res){
  res.sendfile('./with-delete/app.js', function(err) {
    if (err) console.log(err);
  });
};

