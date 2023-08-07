import { UnauthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";

const authentication = async (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders || !authHeaders.startsWith("Bearer")) {
    console.log('here');
    throw new UnauthenticatedError("authentication Invalid");
  }
  const token = authHeaders.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    console.log('siduw');
    throw new UnauthenticatedError("authentication Invalid");
  }
};

export default authentication;
