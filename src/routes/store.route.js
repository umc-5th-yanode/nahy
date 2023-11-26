import express from "express";
import { storeAdd } from "../controllers/store.controller.js";
import { storeReview } from "../controllers/store.controller.js";
import { reviewPreview } from "../controllers/store.controller.js";
import asyncHandler from 'express-async-handler';

export const storeRouter = express.Router({mergeParams: true});

storeRouter.post('/add', storeAdd);
// storeRouter.post('/review', storeReview);
storeRouter.get('/reviews', asyncHandler(reviewPreview));