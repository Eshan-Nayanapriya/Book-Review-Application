import mongoose, { Schema } from "mongoose";

const bookReviewSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      unique: false,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      unique: false,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 1,
      max: 5,
    },
    reviewText: {
      type: String,
      required: [true, "Review Text is required"],
    },
  },
  {
    timestamps: true,
  }
);

const bookReviewModel = mongoose.model("bookReview", bookReviewSchema);

export default bookReviewModel;
