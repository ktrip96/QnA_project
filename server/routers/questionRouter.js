const {
  getAllQuestions,
  getAllQuestionsFromUser,
  createQuestion,
  getQuestionById,
  deleteQuestionById,
  updateQuestionById,
  getLikesById,
  likeQuestion,
  unLikeQuestion
} = require("../controllers/questionController");
const router = require("express").Router();
const auth = require("../middleware/auth");

router.post("/", auth, createQuestion);
router.get("/", getAllQuestions);
router.get("/user", auth, getAllQuestionsFromUser);
router.get("/:id", getQuestionById);
router.delete("/:id", auth, deleteQuestionById);
router.put("/:id", auth, updateQuestionById);
router.get("/:id/likes", getLikesById);
router.patch("/:id/like", auth, likeQuestion);
router.delete("/:id/like", auth, unLikeQuestion);

module.exports = router;
