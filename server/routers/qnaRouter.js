const {
  getAll
} = require("../controllers/qnaController");
const router = require("express").Router();
const auth = require("../middleware/auth");

// router.post("/", auth, createQuestion);
router.get("/", auth, getAll);
// router.get("/:id", auth, getQuestionById);
// router.delete("/:id", auth, deleteQuestionById);
// router.put("/:id", auth, updateQuestionById);
// router.get("/:id/likes", auth, getLikesById);
// router.patch("/:id/like", auth, likeQuestion);
// router.delete("/:id/like", auth, unLikeQuestion);

module.exports = router;
