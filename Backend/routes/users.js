const router = require("express").Router();
const bycrypt = require("bcrypt");
const User = require("../model/User");

// get a user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(user);
    return res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bycrypt.genSalt(10);
        req.body.password = await bycrypt.hash(req.body.password, salt);
      } catch (err) {
        res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("account updated");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("u can only update ur account");
  }
});


module.exports = router;
