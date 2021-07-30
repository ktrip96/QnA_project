const {
  createAnswer,
  getAnswerById,
  deleteAnswerById,
  updateAnswerById,
  getLikesById,
  likeAnswer,
  unLikeAnswer
} = require("../controllers/answerController");
const router = require("express").Router();
const auth = require("../middleware/auth");

router.post("/:id", auth, createAnswer);
// router.get("/", auth, getAllQuestions);
router.get("/:id", auth, getAnswerById);
router.delete("/:id", auth, deleteAnswerById);
router.put("/:id", auth, updateAnswerById);
router.get("/:id/likes", auth, getLikesById);
router.patch("/:id/like", auth, likeAnswer);
router.delete("/:id/like", auth, unLikeAnswer);

module.exports = router;
