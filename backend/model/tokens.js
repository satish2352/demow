const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    token: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      default: '',
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
   // permissions: [PermissionSchema], // Array of permissions
  }, {timestamps:true});
  module.exports = mongoose.model('tokens', tokenSchema);
