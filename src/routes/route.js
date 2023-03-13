const router = require('express').Router();
const { addText } = require('../controllers/textController')
const { signUp, login } = require('../controllers/userController')
// const { authentication } = require('../middlewares/auth')

router.post('/addText', addText)
router.post('/signUp', signUp)
router.post('/login', login)

module.exports = router;