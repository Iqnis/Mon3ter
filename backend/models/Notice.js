const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  type: {
    type: String,
    enum: ['Promotion', 'Warning', 'Compliment', 'Fired'],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  issuedBy: {
    type: String,
    required: true,
  },
  issuedAt: {
    type: Date,
    default: Date.now,
  },
  read: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model('Notice', noticeSchema);

