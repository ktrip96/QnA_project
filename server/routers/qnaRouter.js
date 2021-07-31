const { getAll, getQnAById, search } = require("../controllers/qnaController");
const router = require("express").Router();
const auth = require("../middleware/auth");

router.get("/", auth, getAll);
router.get("/search/:term", auth, search);
router.get("/:id", auth, getQnAById);

module.exports = router;
