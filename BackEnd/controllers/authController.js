import { User } from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../utils/token.js";
import cloudinary from "../utils/cloudinary.js";

export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    if (!fullname || !password || !email) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters." });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const hashpassword = await bcryptjs.hash(password, 10); // Awaiting the hash
    const newUser = new User({
      fullname,
      email,
      password: hashpassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      return res.status(201).json({ message: "User created successfully." });
    } else {
      return res.status(400).send("invalid information..");
    }
  } catch (error) {
    console.log("error", error);
  }
};

//  login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).send("Please fill the input!");

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(404)
        .json({message:"Incorrect details, please enter correct value"});
    }

    const isMatch = await bcryptjs.compare(password, existingUser.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({message:"Incorrect details, please enter correct value"});
    } else {
      generateToken(existingUser._id, res);
      return res
        .status(200)
        .json({ message: "Login successfully", user_id: existingUser._id });
    }
  } catch (error) {
    console.log(`Error ${error}`);
  } 
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).send({
      message: "Logged out successfully",
    });
  } catch (error) {}
};

export const profileUpdate = async (req, res) => {

  try {
    const { profilePic } = req.body;
    const userId = req.user._id;
    if (!profilePic) {
      return res.status(400).json({ message: "Please fill the input!" });
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updateUser);
  } catch (error) {
    console.log(`error: ${error}`);
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ message: "Internal server Error" }); 
  }
};
