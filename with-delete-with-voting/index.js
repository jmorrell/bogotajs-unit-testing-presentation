
exports.index = function(req, res){
  res.sendfile('./with-delete-with-voting/index.html', function(err) {
    if (err) console.log(err);
  });
};

exports.appjs = function(req, res){
  res.sendfile('./with-delete-with-voting/app.js', function(err) {
    if (err) console.log(err);
  });
};

