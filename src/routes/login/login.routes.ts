import express from "express";

import * as userFunction from "../../controllers/login.controller";
import { verifyToken } from "../../middleware/verifyToken";
import { body } from "express-validator";
const router = express.Router();

router.post(
  "/register/user",
  body("password").isLength({ min: 5 }),
  body("email").isEmail().normalizeEmail(),
  userFunction.postUser
);
router.get("/confirm/:token", userFunction.confirmUser);
router.post("/login", userFunction.authenticate);
router.post("/change-password/profile", userFunction.changePassword);
router.post("forgot-password", userFunction.forgotPassword);
router.get("/check-token", userFunction.checkToken);
router.put("/forgot-password/update", userFunction.newPassword);
router.get("/perfil", verifyToken, userFunction.perfil);

export default router;
