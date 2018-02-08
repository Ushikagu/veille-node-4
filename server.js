const express = require('express');
const app = express();
const server = require('http').Server(app);
const fs = require("fs");
const bodyParser = require('body-parser')
const port = 80;

const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'ejs');
app.use(express.static('assets'));




app.get('/', function(req, res) {
  res.render(__dirname + '/templates/index');
});


app.get('/membres', function(req, res) {
  fs.readFile('membres.json', (err, data) => {
    if (err) return console.error(err);

    res.render(__dirname + '/templates/membres', {data: JSON.parse(data)});
  });
});



app.route('/formulaire').get(function(req, res) {
  res.render(__dirname + '/templates/formulaire');
}).post(urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400)
  fs.readFile('membres.json', (err, data) => {
    if (err) return console.error(err);

    let newData = JSON.parse(data);

    newData.membres.push(req.body);


    fs.writeFile('membres.json', JSON.stringify(newData));

    res.redirect('/membres');
  });

});


server.listen(port, function() {
 console.log('Server listening on http://localhost:' + port);
});
