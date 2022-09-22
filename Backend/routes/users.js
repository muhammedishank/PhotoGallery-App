const router = require("express").Router();
const bycrypt = require("bcrypt");
const User = require("../model/User");

// get a user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json("updated");
  } catch (err) {
    res.status(500).json(err);
  }
});
// Update user
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.body.userId },
      {
        $set: {
          email: req.body.email,
          phone: req.body.phone,
          password: req.body.password,
          image: req.body.image,
        },
      }
    );
    await user.save()
    console.log("updated");
    res.status(200).json("account updated");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
