import User from "../model/userModel.js"
import bcryptjs from "bcryptjs"

export const login = async(req, res)=>{
    const {name, pwd} = req.body;
    try {
     //Check all required fields
    if(!name || !pwd){
        res.status(401).json("All fields required")
        return;
    }
    //verify user
    const verifiedUser = await User.findOne({name}).exec()
    if (!verifiedUser){
        res.status(403).json("No user. Please register")
        return;
    }
    //verify password
    const verifyPassword = await bcryptjs.compare(pwd, verifiedUser.pwd)
    if(!verifyPassword){
    res.status(401).json("Not authorized")
    return;
    }
    //Login user
    res.status(200).json("Successfully logged in")
} catch (error) {
    res.status(404).json(error)
    }
}



export const register = async(req, res)=>{
    try {
     const {name, pwd} = req.body;
    //Check all fields required
    if(!name || !pwd){
    res.status(401).json("All fields required")
    }
    //Check duplicates
    const duplicateUser = await User.findOne({name}).exec()
    if(duplicateUser){
    res.status(403).json("This user already exists")
    return;
    }
    //Create user
    const newUser = await User.create({
      name,
      pwd  
    })
    res.status(200).json(newUser)
    } catch (error) {
    console.log(error);
    }
}


export const logout = (req, res)=>{
    res.status(200).json("Logged out")
}