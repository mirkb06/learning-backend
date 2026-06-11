const bcrypt = require("bcrypt");

const { findUserByEmail, createUser } = require("./auth.repository.js");

const registerUser = async (name, email, password) => {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        throw new Error("User already Exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser(name, email, hashedPassword);

    const {password, ...userData} = user;
    return {
        user: userData
    };
}

const loginUser = async (email,password) => {
    const user = await findUserByEmail(email);
    if(!user){
        throw new Error("Invalid Credentials");
    }
    return user;
}
module.exports = {
    registerUser
};