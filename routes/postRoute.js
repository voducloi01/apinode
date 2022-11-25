const express = require("express");
const { verifyToken } = require("../middlewares/verifyToken");
const {
	getAllports,
	createOnePorts,
	updateOnePort,
	deleteOnePost,
} = require("../controllers/postController");

const Router = express.Router();

Router.route("/").get(getAllports).post(verifyToken, createOnePorts);

Router.route("/:postId")
	.put(verifyToken, updateOnePort)
	.delete(verifyToken, deleteOnePost);

module.exports = Router;
