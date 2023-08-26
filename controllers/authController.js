import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors/index.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import crypto from "crypto";
import sendVerificationEmail from "../utils/sendVerificationEmail.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("Please Provide all the values");
  }

  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("User Already exists");
  }
  const verificationToken = crypto.randomBytes(40).toString("hex");
  const origin = "https://notes-app-wm1e.onrender.com";
  const user = await User.create({ name, email, password, verificationToken });
  await sendVerificationEmail({ name, email, verificationToken, origin });
  const token = user.createJWT(user);

  res.status(StatusCodes.CREATED).json({ user, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please Provide all the values");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new BadRequestError("Not a user Please register");
  }
  if (!user.isVerified) {
    throw new BadRequestError("Email is not verified");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new BadRequestError("Password is incorrect");
  }
  const token = user.createJWT(user);

  res.status(StatusCodes.CREATED).json({ user, token });
};
const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  if (!verificationToken || !email) {
    throw new BadRequestError("Invalid Request");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError("User doesnot exist");
  }
  if (user.verificationToken !== verificationToken) {
    throw new UnauthenticatedError("Invalid token");
  }
  user.verificationToken = "";
  user.isVerified = true;
  user.save();
  res.status(StatusCodes.OK).json({ msg: "Verification is successfull !!!" });
};

export { register, login, verifyEmail };
