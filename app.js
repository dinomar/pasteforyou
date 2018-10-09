require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//Pastebin
const pasteUpload = require('./modules/pasteapi');
const sendMail = require('./modules/emailHandler');

//set static resources
app.use(express.static(__dirname + '/static'));

//use body parser
app.use(bodyParser.urlencoded( {extended: false} ));

//set views
app.set('views', __dirname + '/views');


//routes
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
});

app.post('/upload', (req, res) => {
	
	if (!req.body.title || !req.body.memo || !req.body.email) {
		res.json({});
	}
	
	let title = req.body.title;
	let memo = req.body.memo;
	let email = req.body.email;
	
	//upload memo to pastebin
	pasteUpload(title, memo, (err, data) => {
		//check err
		if (err) {
			console.log(err);
			res.json({});
		}
		
		//check api response
		if (!data.includes("http")) {
			res.json({});
		}
		
		//email pastebin url to user
		let mailOptions = {
			to: email,
			subject: "Pasteforyou",
			text: `Thank you for using Pasteforyou. Your pastebin link is ${data}`
		};
		
		sendMail(mailOptions, (err, info) => {
			if (err) {
				console.log(err);
				res.json({});
			}
			
			console.log(info.response);
			res.json({url: data});
		});
		
	});
});


//server
const listener = app.listen(process.env.PORT, () => {
	console.log('Listening on port ' + listener.address().port);
});
