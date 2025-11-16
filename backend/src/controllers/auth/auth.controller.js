import { ApiError } from "../../utils/ApiError.js";
import { asyncHandler } from "../../utils/AsyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models/user.models.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
// import { authMiddleware } from "../../middlewares/auth.middleware.js";

// register
const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });

    if (checkUser) {
      return res.json({
        status: 400,
        message: "Email already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();

    await res
      .status(201)
      .json(new ApiResponse(200, newUser, "Registration successful"));
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Some error occurred:");
  }
});

// login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.json({
        // status: 400,
        success: false,
        message: "This username does not exist",
      });
    }

    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword) {
      return res.json({
        // status: 400,
        success: false,
        message: "Please enter correct password",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY",
      {
        expiresIn: "120m",
      }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
      })
      .json({
        success: true,
        message: "Logged in successfully",
        user: {
          id: checkUser._id,
          role: checkUser.role,
          email: checkUser.email,
          userName: checkUser.userName,
        },
      });
    //   .json(
    //     new ApiResponse(200, {
    //       user: {
    //         id: checkUser._id,
    //         email: checkUser.email,
    //         role: checkUser.role,
    //       },
    //       message: "Logged in successfully",
    //     })
    //   );
  } catch (error) {
    throw new ApiError(500, "Some error occurred");
  }
});

// logout
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully",
  });
});

const authMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    throw new ApiError(401, "Unauthorized user!");
  }

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    throw new ApiError(401, "Unauthorized user!");
  }
});

export { registerUser, loginUser, logoutUser, authMiddleware };
