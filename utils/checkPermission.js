import { UnauthenticatedError } from "../errors/index.js";
const checkPermission = (userId, resourceUserId) => {
  if (userId === resourceUserId.toString()) {
    return;
  }
  throw new UnauthenticatedError("Not allowed to access this note");
};

export default checkPermission;
