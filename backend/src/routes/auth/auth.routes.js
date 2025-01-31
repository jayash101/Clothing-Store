import { Router } from "express";
import {
  loginUser,
  registerUser,
  authMiddleware,
  logoutUser,
} from "../../controllers/auth/auth.controller.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(logoutUser);

router.route("/check-auth").get(authMiddleware, (req, res) => {
  const user = req.user;
  // new ApiResponse(200, user, "Authenticated user");

  res.status(200).json({
    success: true,
    message: "Authenticated user",
    user,
  });
});

export default router;
