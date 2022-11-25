const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res, next) => {
	try {
		const user = await User.create(req.body);
		const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
		res.status(200).json({
			status: "success",
			data: { token, userName: user.name },
		});
	} catch (error) {
		res.json(error);
	}
};

exports.login = async (req, res, next) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			//error
			const err = new Error("Email is not correct!");
			err.statusCode = 400;
			return next(err);
		}
		if (bcrypt.compareSync(req.body.password, user.password)) {
			const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
			res.status(200).json({
				status: "sucssess",
				data: {
					token,
					Username: user.name,
				},
			});
		} else {
			//errrr
			const err = new Error("Password is not correct!");
			err.statusCode = 400;
			return next(err);
		}
	} catch (error) {
		res.json(error);
	}
};
