const mongoose = require("mongoose");
const URI = process.env.DB_URI;
const connectDB = async () => {
	try {
		await mongoose.connect(URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("MongoDB connected");
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
};

module.exports = { connectDB };
