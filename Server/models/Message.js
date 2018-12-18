const mongoose = require('mongoose');
const User = require('./User');

const messageSchema = new mongoose.Schema({
  title:{
    type:String,
    required: true,
  },
  text: {
    type: String,
    required: true,
    maxLength: 140,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
},{
  timestamps: true
});

messageSchema.pre('remove', async function (next) {
  try {
    const user = await User.findById(this.user);
    user.messages.remove(this.id);
    await user.save();
    return next();
  } catch (err) {
    return next(err);
  }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
