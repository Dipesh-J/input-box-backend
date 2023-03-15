const router = require("express").Router();
const { addText } = require("../controllers/textController");
const { signUp, login } = require("../controllers/userController");
// const { authentication } = require('../middlewares/auth')

router.post("/addText", addText);
router.post("/signup", signUp);
router.post("/login", login);

// router.all("/*", async function (req, res) {
//   return res.status(404).send({ status: false, message: "Page Not Found." });
// });
module.exports = router;
