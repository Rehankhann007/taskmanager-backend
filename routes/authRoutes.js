const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

// ✅ Health check route
router.get('/test', (req, res) => {
  res.json({ status: 'ok', message: 'API is live' });
});

module.exports = router;
