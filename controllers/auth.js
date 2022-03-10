const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const { username, email, password, } = req.body;
    const newUser = new User({
      username,
      email,
      password: CryptoJS.AES.encrypt(
        password,
        process.env.PASS_SEC
      ).toString(),
    });
  
    try {
      const savedUser = await newUser.save();
      res.status(201).json({msg: 'User created'});
    } catch (err) {
      res.status(500).json(err);
    }
}

const login = async (req, res) => {
    try{
        const { username } = req.body
        const user = await User.findOne(
            {
                username
            }
        );

        if ( !user ){
            res.status(401).json("Wrong User Name");
        }    

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );


        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        const inputPassword = req.body.password;
        
        if (originalPassword != inputPassword) {
            return res.status(401).json("Wrong Password");
        }

        const accessToken = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
            {expiresIn:"3d"}
        );

        const { password, ...others } = user._doc;  
        res.status(200).json({...others, accessToken});

    }catch(err){
        res.status(500).json(err);
    }

}
module.exports = {
    register,
    login
}