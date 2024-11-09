const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const User = require('../models/User');

// Yeni işlem ekleme
router.post('/', async (req, res) => {
  try {
    const { userId, type, amount } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    const transaction = new Transaction(req.body);
    await transaction.save();

    // Kredi ve itibar puanını güncelle (basit bir örnek)
    user.creditScore += amount * 0.01;
    user.reputationScore += amount * 0.005;
    await user.save();

    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Kullanıcının işlemlerini getirme
router.get('/user/:userId', async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId }).sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;