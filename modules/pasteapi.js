const request = require('request');

const key = process.env.PASTEAPI;
const url = process.env.PASTEURL;

const upload = (title, memo, next) => {
	
	let options = {
		"api_dev_key": key,
		"api_option": "paste",
		"api_paste_code": memo,
		"api_paste_private": "1", // 0 = public, 1 = Unlisted
		"api_paste_name": title,
		"api_paste_expire_date": "N", //N = Never
		"api_paste_format": "text"
	};

	
	request.post(url, { form: options }, (err, res, data) => {
		if (err || res.statusCode != 200) {
			return next(err);
		}
		return next(null, data);
	});
};

module.exports = upload;