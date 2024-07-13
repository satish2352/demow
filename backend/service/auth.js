const jwt = require("jsonwebtoken");
require("dotenv").config();
const apiResponse = require('../helper/apiResponse');
const User = require('../model/user')

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_EXPIRES = process.env.JWT_EXPIRES;

async function setUser(user) {
    try {
        // Options object
        const options = {};
        // If JWT_EXPIRES is defined, add expiresIn to options
        if (JWT_EXPIRES) {
            options.expiresIn = JWT_EXPIRES;
        }
        const payload = { _id: user._id, email: user.email, role: user.role };
        return jwt.sign(payload, JWT_SECRET_KEY, options);
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function checkUserExistsWithotToken(req, res, next) {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            if (userExists.is_active == false || userExists.is_deleted == true) {
                return apiResponse.unauthorizedResponse(res, 'User is not active or deleted');
            }
            req.user = userExists;
            next();
        } else {
            return apiResponse.unauthorizedResponse(res, 'User not found');
        }
    } catch (error) {
        console.log(error);
        return apiResponse.unauthorizedResponse(res, 'Error occured which checking user.');
    }
}

module.exports = { checkUserExistsWithotToken, setUser }