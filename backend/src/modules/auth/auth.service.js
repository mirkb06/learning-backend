const bcrypt = require("bcrypt");

const { findUserByEmail, createUser } = require("./auth.repository.js");

const { generateToken } = require("../../utils/jwt.js")

//Registration Service
const registerUser = async (name, email, password) => {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        throw new Error("User already Exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(name, email, hashedPassword);
    const { password: removePassword, ...userData } = user;
    return {
        user: userData
    };
}

//Login Service
const loginUser = async (email, password) => {
    const user = await findUserByEmail(email);
    if (!user) {
        throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid Credentials");
    }
    const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role
    });
    const { password: removePassword, ...userData } = user;
    return {
        user: userData,
        token: token
    };
}
module.exports = {
    registerUser,
    loginUser
};