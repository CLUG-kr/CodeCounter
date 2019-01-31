var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getHtml/:file', function(req, res, next){
  var name = req.params.file + '.html';
  console.log(name);
  fs.readFile('public/html/' + name, 'utf8', function(err, data){
  	res.send(data);
  });
});

router.post('/login', function(req, res, next){
	if (req.body.id == 'admin' && req.body.pw == '1234') {
		var data = {}
		data['status'] = 'success'
		res.send(data);
	}else {
		res.send('fail');
	}
});


module.exports = router;
