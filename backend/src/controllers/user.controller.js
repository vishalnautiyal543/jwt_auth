import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//register
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // console.log(req.body);

  if (!name || !email || !password) {
    throw new ApiError(401, "all fields are required");
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

export { register, getUsers, login };
