var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

const uri = 'mongodb://127.0.0.1:27017/user_db_name';

var db = mongoose.connect(uri, (err) => {
	if (err) {
		console.log(err.message);
	} else {
		console.log('Succesfully Connected!');
	}
});


var UserSchema = new mongoose.Schema({
	password: String, // 비밀번호
	name: String, // 이름
	id: String, // 아이디
});


var Users = mongoose.model('users', UserSchema);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '1gb', extended: false }));

app.post('/signup', (req, res) => {
	var new_user = new Users(req.body);

	new_user.save((err) => {
		if (err) return res.status(500).json({ message: '저장 실패!' });
		else return res.status(200).json({ message: '저장 성공!', data: new_user });
	});
});

app.post('/signin', (req, res) => {
	Users.findOne({ id: req.body.id, password: req.body.password }, (err, user) => {
		if (err) return res.status(500).json({ message: '에러!' });
		else if (user) return res.status(200).json({ message: '유저 찾음!', data: user });
		else return res.status(404).json({ message: '유저 없음!' });
	});
});

app.listen(4000, () => console.log('Server On 4000'));