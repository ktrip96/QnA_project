const { getAll, getQnAById, search } = require("../controllers/qnaController");
const router = require("express").Router();
const auth = require("../middleware/auth");

router.get("/", getAll);
router.get("/search/:term", search);
router.get("/:id", getQnAById);

module.exports = router;
