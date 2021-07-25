const {
  register,
  login,
  logout,
  isLoggedIn,
  getUserData,
  deleteUser,
  updateUser
} = require("../controllers/userController");
const router = require("express").Router();
const auth = require("../middleware/auth");

router.post("/", register);
router.get("/", auth, getUserData);
router.delete("/", auth, deleteUser);
router.put("/", auth, updateUser);
router.post("/login", login);
router.post("/logout", auth, logout);
router.get("/isLoggedIn", isLoggedIn);

module.exports = router;
