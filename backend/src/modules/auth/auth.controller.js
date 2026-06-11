const {registerUser, loginUser} = require("./auth.service.js");

const register = async(req, res) => {
    try{
        const {name, email, password} = req.body;

        const user = await registerUser(name, email, password);

        return res.status(201).json({
            success: true, 
            message:  "User Registered Successfully",
            data:user
        })

    }catch(error) {
        return res.status(400).json({
            success: false, 
            message: error.message
        });
    }
};

const login = async(req, res) =>{
    try{

        const {email, password} = req.body;
        const result = await loginUser(email,password);
        return res.status(201).json({
            success: true,
            message:"User Login Successful",
            data:result
        });

    }catch(error){
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const profile = (req, res) => {
        return res.status(200).json({
            success: true, 
            data: req.user
        });
}
module.exports = {
    register, login, profile
};