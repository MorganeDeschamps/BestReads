const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

/* router.delete("/deleteUser")
  User.findAll()

 */
module.exports = router;
