const {
  getAll,
  getQnAById
} = require("../controllers/qnaController");
const router = require("express").Router();
const auth = require("../middleware/auth");

router.get("/", auth, getAll);
router.get("/:id", auth, getQnAById);

module.exports = router;
