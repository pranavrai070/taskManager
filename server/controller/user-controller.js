import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../model/User.js";

const secret = 'test';

export const login = async (req, res) => {
  console.log("login called")
  const { email, password } = req.body;
  // console.log(req.body);

  try {
    
    const oldUser = await UserModal.findOne({ email });
    // console.log(oldUser);

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Password" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result:oldUser, token,message:"Succefully Logged In" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};


export const signup = async (req, res) => {
  console.log("signup called");
  const { email, password, firstName, lastName,question,answer } = req.body;
  // console.log(req.body);

  try {
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  const correctedFirstName=capitalizeFirstLetter(firstName);
  const correctedLastName=capitalizeFirstLetter(lastName);
  
    function checkPassword(passwords){
      var passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      return passwordRegex.test(passwords); 
    };
  
  
    let flag=checkPassword(password);

    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    if(flag){
      var newPass=password;
      // console.log(flag);
    }else{
      return res.status(400).json({message:"Password is not validated"});
    }

    const hashedPassword = await bcrypt.hash(newPass, 12);

    const hashedQuestion = await bcrypt.hash(question, 12);

    const hashedAns = await bcrypt.hash(answer, 12);
    
    const result = await UserModal.create({ email, password: hashedPassword,securityQuestion:hashedQuestion,securityAnswer:hashedAns, name: `${correctedFirstName} ${correctedLastName}` });
    // console.log(result);

    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {  
  res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};


export const recover = async (req, res) => {
  console.log("recover called");
  const {email,question,answer}=req.body;
  console.log(req.body);

  try {
    const oldUser = await UserModal.findOne({ email });
    // console.log(oldUser);

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isQuestionCorrect = await bcrypt.compare(question, oldUser.securityQuestion);
    const isAnsCorrect = await bcrypt.compare(answer, oldUser.securityAnswer);

    if (!isAnsCorrect||!isQuestionCorrect) return res.status(401).json({ message: "Security credentials not matched" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
    // console.log(token);
    
    res.status(200).json({result:oldUser, token,message:"Token given for the user" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(err.message);
  }
};

export const changePassword = async (req, res) => {
  console.log("changePassword called");
  const {email,password}=req.body;
  console.log(req.body);

  try {
    const oldUser = await UserModal.findOne({ email });
    // console.log(oldUser);

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    function checkPassword(passwords){
      var passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      return passwordRegex.test(passwords); 
    };
   
    let flag=checkPassword(password);

    if(flag){
      var newPass=password;
      // console.log(flag);
    }else{
      return res.status(400).json({message:"Password is not validated"});
    }

    const hashedPassword = await bcrypt.hash(newPass, 12);

    const user = await UserModal.findOneAndUpdate(
      { email:oldUser.email },
      {password:hashedPassword}
  )
  await user.save();
  // console.log(user);
  
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
    
    res.status(200).json({result:oldUser, token,message:"Successfully changed the Password" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(err.message);
  }
};






