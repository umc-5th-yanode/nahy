// routes/user.route.js
import express from "express";
import asyncHandler from 'express-async-handler';
import { userSignin, userJoinMission } from "../controllers/user.controller.js";

export const userRouter = express.Router();

userRouter.post('/signin', userSignin);
userRouter.post('/new-mission', userJoinMission);