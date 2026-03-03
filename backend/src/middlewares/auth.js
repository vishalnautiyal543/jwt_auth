import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

const auth = (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = decodedToken; // attach user info to request
    next();
  } catch (error) {
    next(new ApiError(401, "Invalid or expired token"));
  }
};

export { verifyJWT };