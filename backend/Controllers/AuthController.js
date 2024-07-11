const UserModel = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const signup = async (req,res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if(user) {
            return res.status(409).json({ message:"User already exist, You can login", success: false});
        }
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10); //we store hashed password into database password field using userModel.password
        await userModel.save();

        res.status(201).json({ message:"Signup Successfully", success: true})
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", success: false})
    }
}


const login = async (req,res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = "Auth failed email or password is wrong"
        if(!user) {
            return res.status(403).json({ message:errorMsg, success: false});
        }
        const isPassEqual = await bcrypt.compare(password, user.password); //first is user given password during login, 2nd is database stored password
        if(!isPassEqual){
            return res.status(403).json({ message:errorMsg, success: false})
        }

        const jwtToken = jwt.sign(
            {emal: user.email, _id: user._id},
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200).json({ message:"Login success", success: true, jwtToken, email, name: user.name })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", success: false})
        console.log(error);
    }
}



module.exports = {
    signup, login
}