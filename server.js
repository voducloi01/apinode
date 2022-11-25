//dotenv
require("dotenv").config();

//connect db
const { connectDB } = require("./configs/db");
connectDB();

const express = require("express");
const cors = require("cors");

const app = express();

//error handler
const { errorHandler } = require("./middlewares/errorhandler");

//cors
app.use(cors());

//router
const authRoute = require("./routes/authRoute");
const postRoute = require("./routes/postRoute");

//body parse
app.use(express.json());

//Mount route
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/ports", postRoute);
app.all("*", (req, res, next) => {
	const err = new Error(" the route  can not be  found !");
	err.statusCode = 404;
	next(err);
});
app.use(errorHandler);

const port = process.env.APP_PORT;
app.listen(port, () => {
	console.log(`server is running on port ${port}`);
});
