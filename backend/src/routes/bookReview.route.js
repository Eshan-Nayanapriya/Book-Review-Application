import { Router } from "express";
import {
  createBookReviewController,
  getAllBookReviewsController,
  getBookReviewByIdController,
  updateBookReviewController,
  deleteBookReviewController,
} from "../controllers/bookReview.controller.js";

const bookReviewRouter = Router();

bookReviewRouter.post("/", createBookReviewController);
bookReviewRouter.get("/", getAllBookReviewsController);
bookReviewRouter.get("/:id", getBookReviewByIdController);
bookReviewRouter.put("/:id", updateBookReviewController);
bookReviewRouter.delete("/:id", deleteBookReviewController);

export default bookReviewRouter;
