const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: 'Başarılı' },
  aiInsight: { type: String }
});

module.exports = mongoose.model('Transaction', transactionSchema);