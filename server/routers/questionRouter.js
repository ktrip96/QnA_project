const {
  getAllQuestions,
  createQuestion,
  getQuestionById,
  deleteQuestionById
} = require("../controllers/questionController");
const router = require("express").Router();
const auth = require("../middleware/auth");

router.post("/", auth, createQuestion);
router.get("/", auth, getAllQuestions);
router.get("/:id", auth, getQuestionById);
router.delete("/:id", auth, deleteQuestionById);

module.exports = router;
