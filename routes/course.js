var express = require("express");
var router = express.Router();

router.get("/:id", function (req, res, next) {
	const course_id = req.params.id
	res.render("pages/course", {course: require("../db/_testing_obj").courseExample});
});

module.exports = router;
