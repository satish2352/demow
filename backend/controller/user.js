const apiResponse = require('../helper/apiResponse')
const  User = require('../model/user');
const  Tokens = require('../model/tokens');
const bcrypt = require('bcrypt');
const { setUser } = require('../service/auth');
const ALLOW_MULTIPLE_LOGINS = process.env.ALLOW_MULTIPLE_LOGINS;


async function handleLoginUser(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return apiResponse.ErrorResponse(res, 'User not found');
        }
        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return apiResponse.ErrorResponse(res, 'Invalid credentials');
        }
        // Generate a JWT token using the authService
        const token = await setUser(user);
        if (!token) {
            return apiResponse.ErrorResponse(res, 'Error generating token');
        }
        if (ALLOW_MULTIPLE_LOGINS == true) {
            // Allow multiple tokens per user
            const newToken = new Tokens({ userId: user._id, token, });
            await newToken.save();
        } else {
            // Ensure only one token per user
            await Tokens.findOneAndUpdate(
                { userId: user._id },
                { token },
                { upsert: true, new: true }
            );
        } // Return success response with the token
        return apiResponse.successResponseWithData(res, 'Login successful', { token });
    } catch (error) {
        console.error(error);
        return apiResponse.ErrorResponse(res, 'Error occurred during API call');
    }
}


async function handleCreateUser(req, res) {
    try {
        // Extract user details from the request body
        const { firstName, lastName, mobile, email, password, roleId, role } = req.body;
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return apiResponse.ErrorResponse(res, "User already exists with provided email id");
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create new user
        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            mobile: mobile,
            email: email,
            password: hashedPassword,
            roleId: roleId,
            role: role
        });
        // Save user to the database
        const savedUser = await newUser.save();
        return apiResponse.successResponse(res, 'User created successfully');

    } catch (error) {
        console.error(error);
        return apiResponse.ErrorResponse(res, 'Error occurred during API call');
    }
}

module.exports = {
    handleCreateUser,
    handleLoginUser
}