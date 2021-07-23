const {
  register,
  login,
  logout,
  isLoggedIn,
  getUserData,
} = require("../controllers/userController");
const router = require("express").Router();
const auth = require("../middleware/auth");

router.post("/", register);
router.post("/login", login);
router.post("/logout", auth, logout);
router.get("/isLoggedIn", isLoggedIn);
router.get("/getUser", auth, getUserData);
module.exports = router;
