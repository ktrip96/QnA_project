const {
  register,
  login,
  logout,
  isLoggedIn,
} = require("../controllers/userController");
const router = require("express").Router();
const auth = require("../middleware/auth");

router.post("/", register);
router.post("/login", login);
router.post("/logout", auth, logout);
router.get("/isLoggedIn", isLoggedIn);

module.exports = router;
