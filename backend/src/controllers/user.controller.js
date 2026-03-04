import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

//register
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // console.log(req.body);

  if (!name || !email || !password) {
    throw new ApiError(401, "all fields are required");
  }

  const existingUser = await User.findOne({email});

  if (existingUser) {
    throw new ApiError(401, "user already registered")
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const newUser = await User.findById(user._id).select("-password");

  res
    .status(200)
    .json(new ApiResponse(200, "user registered successfully", newUser));
});

//login

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, "user not found");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "invalid credentials");
  }

  const accessToken = await user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,

        "User logged In Successfully",
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
      ),
    );
});

//get users

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");

  res.status(200).json({
    data: users,
  });
});

//refresh Token
const refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  try {
    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decodedToken._id).select("-password");
    if (!user) return res.sendStatus(401);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(200, "Tokens refreshed successfully", {
          accessToken,
          refreshToken,
        }),
      );
  } catch (error) {
    throw new ApiError(401, "Invalid refresh token");
  }
});

export { register, getUsers, login, refreshToken };
