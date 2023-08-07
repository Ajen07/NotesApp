import { StatusCodes } from "http-status-codes";

const notFound = async (err, req, res, next) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: "This Route doesnot exist" });
};

export default notFound;
