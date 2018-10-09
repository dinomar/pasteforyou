const nodemailer = require('nodemailer');

const user = process.env.EMAILUSER;
const pass = process.env.EMAILPASS;

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: user,
		pass: pass
	}
});

const sendMail = (mailOptions, next) => {
	mailOptions["from"] = user;
	
	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			return next(err);
		}
		return next(null, data);
	});
};

module.exports = sendMail;