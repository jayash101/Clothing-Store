// import { ApiError } from "../utils/ApiError.js";
// import { asyncHandler } from "../utils/AsyncHandler.js";

// export const authMiddleware = asyncHandler(async (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     throw new ApiError(401, "Unauthorized user!");
//   }

//   try {
//     const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
//     req.user = decoded;
//     next();
//   } catch (error) {
//     throw new ApiError(401, "Unauthorized user!");
//   }
// });
