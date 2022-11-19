import express from "express";
import * as userFunction from "../../controllers/user.controller";

const router = express.Router();

router.get("/user/all", userFunction.getAllUser);

export default router;
