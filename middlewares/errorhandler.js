exports.errorHandler = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;

	if(err.code === 11000) {
		err.statusCode = 400 ; 
		for(let p in err.keyValue) {
			err.message = `${p} have to be unique`
		}
	}
	
	if(err.kind === "ObjectId") {
		err.statusCode = 404 ;
		err.message = `The ${req.originalUrl} is not found because of wrong ID`;
	}



	res.status(err.statusCode).json({
		status: "fail",
		message: err.message,
	});
};
