var restify = require("restify");
var request = require("request");

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3000, function () {
  console.log('%s listening to %s', server.name, server.url); 
});

server.use(restify.plugins.bodyParser({ mapParams: true }));
server.get('/*.html', restify.plugins.serveStatic({
  directory: './dist',
  default: 'index.html',
}));

server.post('/api/ranking', (req, res, next) => {
  let headers = {
      'Content-Type': 'application/json'
  };
  let teamOptions = {
    url: 'https://msopenhack.azurewebsites.net/api/trivia/leaderboard/user',
    method: 'POST',
    headers: headers,
    json: true,
    form: req.body,
  };
  request(teamOptions, function (error, response, body) {
    res.contentType = "json";
    res.body = JSON.stringify(body);
    res.send(body);
  });
  return next();
});
