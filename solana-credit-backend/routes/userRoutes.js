const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Kullanıcı oluşturma veya güncelleme
router.post('/', async (req, res) => {
  try {
    const { walletAddress } = req.body;
    let user = await User.findOne({ walletAddress });
    if (!user) {
      user = new User(req.body);
    } else {
      Object.assign(user, req.body);
    }
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Kullanıcı bilgilerini getirme
router.get('/:walletAddress', async (req, res) => {
  try {
    const user = await User.findOne({ walletAddress: req.params.walletAddress });
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;