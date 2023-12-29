import userModal from "../models/userModal.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

//user register
export const userRegisterController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //find user
    const finduser = await userModal.findOne({ email });
    if (finduser) {
      return res.status(500).send({
        success: false,
        message: "User Alredy Resiter",
      });
    }
    const user = new userModal({ username, password, email });
    await user.save();
    const token = user.getSignedTokan(res);
    res.status(200).send({
      success: true,
      message: "User Register Successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: "Error while register user",
      error,
    });
  }
};

//user login
export const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide email or password",
      });
    }

    //find user
    const findUser = await userModal.findOne({ email });

    if (!findUser) {
      return res.status(404).send({
        success: false,
        message: "Invalid user",
      });
    }
    //compare password
    const matchPassword = await bcrypt.compare(password, findUser.password);
    if (!matchPassword) {
      return res.status(404).send({
        success: false,
        message: "Invelid email or password",
      });
    }
    const token = JWT.sign(
      { id: findUser._id },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "15d",
      }
    );

    return res.status(200).send({
      success: true,
      message: "User login successfully",
      token,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "Error while login user",
      error,
    });
  }
};

//user logout
export const userLogoutController = async (req, res) => {
  try {
    res.clearCookie("refreshToken");
    res.status(200).send({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
