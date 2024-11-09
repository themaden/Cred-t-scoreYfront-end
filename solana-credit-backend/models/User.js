const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true },
  creditScore: { type: Number, default: 0 },
  reputationScore: { type: Number, default: 0 },
  riskTolerance: { type: Number, default: 50 },
  notifications: { type: Boolean, default: true },
  aiAnalysisEnabled: { type: Boolean, default: true }
});

module.exports = mongoose.model('User', userSchema);