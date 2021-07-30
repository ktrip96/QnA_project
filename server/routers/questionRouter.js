const {
  getAllQuestions,
  createQuestion,
} = require("../controllers/questionController");
const router = require("express").Router();
const auth = require("../middleware/auth");

router.post("/", auth, createQuestion);
router.get("/", auth, getAllQuestions);

module.exports = router;
