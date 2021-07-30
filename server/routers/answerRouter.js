const {
  createAnswer,
  getAnswerById,
  deleteAnswerById
} = require("../controllers/answerController");
const router = require("express").Router();
const auth = require("../middleware/auth");

router.post("/:id", auth, createAnswer);
// router.get("/", auth, getAllQuestions);
router.get("/:id", auth, getAnswerById);
router.delete("/:id", auth, deleteAnswerById);
// router.put("/:id", auth, updateQuestionById);
// router.get("/:id/likes", auth, getLikesById);
// router.patch("/:id/like", auth, likeQuestion);
// router.delete("/:id/like", auth, unLikeQuestion);

module.exports = router;
