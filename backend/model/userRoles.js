const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserRolesSchema = new Schema({
    roleId: {
      type: Number,
      required: true,
      unique: true,
    },
    roleTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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
  module.exports = mongoose.model('UserRoles', UserRolesSchema);
