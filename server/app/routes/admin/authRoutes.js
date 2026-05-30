let express = require('express');
const { register, login, getMe } = require('../../controllers/admin/authController');
const auth = require('../../middleware/auth');
let authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/me', auth, getMe);

module.exports = authRouter;
