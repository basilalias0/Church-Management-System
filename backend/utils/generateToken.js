const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role,
            profilePicture: user.profilePicture,
            email: user.email,
            fullName: user.name,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '30d',
        }
    );
};

module.exports = generateToken;