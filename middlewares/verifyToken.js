const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
	//access Authorization from req header
	const Authorization = req.header("authorization");
	if (!Authorization) {
		//error
		const err = new Error("Authorization is not correct!");
		err.statusCode = 400;
		return next(err);
	}
	const token = req.headers.authorization.split(" ")[1];
	const { userId } = jwt.verify(token, process.env.APP_SECRET);
	req.user = { userId };
	next();
};
