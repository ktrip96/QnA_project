const {
  getAllQuestions,
  createQuestion,
} = require("../controllers/questionController");
const router = require("express").Router();
const auth = require("../middleware/auth");

router.post("/", auth, createQuestion);
router.get("/", auth, getAllQuestions);
router.get("/:id", auth);

module.exports = router;
