const router = require("express").Router();

const {
  register,
  login,
  checkEmail,
  checkPhoneNum,
  logout,
  forgottPassword,
  editUser
} = require("../controller/controller");
router.post("/register", register);
router.post("/login", login);
router.post("/checkEmail", checkEmail);
router.post("/checkPhoneNum", checkPhoneNum);
router.get("/logout", logout);
router.put("/forgottPassword", forgottPassword);

module.exports = router;
