const Post = require("../models/Post");

exports.getAllports = async (req, res, next) => {
	try {
		const post = await Post.find({}).populate("author");
		res.status(200).json({
			status: "success",
			results: post.length,
			data: { post },
		});
	} catch (error) {
		next(error);
	}
};
exports.createOnePorts = async (req, res, next) => {
	try {
		const { userId } = req.user;
		const post = await Post.create({ ...req.body, author: userId });
		res.status(200).json({
			status: "success",
			data: { post },
		});
	} catch (error) {
		next(error);
	}
};

exports.updateOnePort = async (req, res, next) => {
	try {
		const id = req.params;
		const post = await Post.findByIdAndUpdate(
			id.postId,
			{ ...req.body },
			{ new: true, runValidator: true }
		);
		res.status(200).json({
			status: "success",
			data: { post },
		});
	} catch (error) {}
};

exports.deleteOnePost = async (req, res, next) => {
	try {
		const id = req.params;
		await Post.findByIdAndDelete(id.postId);
		res.status(200).json({
			status: "success",
			message: "Delete Success!",
		});
	} catch (error) {
		res.json(error);
	}
};
