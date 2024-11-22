import BookReviewModel from "../models/bookReview.model.js";

//Create bookReview
export async function createBookReviewController(req, res) {
  try {
    const { title, author, rating, reviewText } = req.body;

    if (!title || !author || !rating || !reviewText) {
      return res.status(400).json({
        message: "All fields (title, author, rating, reviewText) are required!",
        error: true,
        success: false,
      });
    }

    const newReview = new BookReviewModel({ title, author, rating, reviewText });
    const savedReview = await newReview.save();

    return res.status(201).json({
      message: "Book review created successfully!",
      data: savedReview,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//Read all bookReviews
export async function getAllBookReviewsController(req, res) {
  try {
    const reviews = await BookReviewModel.find();
    return res.status(200).json({
      message: "Book reviews fetched successfully!",
      data: reviews,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//Read bookReview by ID
export async function getBookReviewByIdController(req, res) {
  try {
    const { id } = req.params;

    const review = await BookReviewModel.findById(id);
    if (!review) {
      return res.status(404).json({
        message: "Book review not found!",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Book review fetched successfully!",
      data: review,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//Update a bookReview by ID
export async function updateBookReviewController(req, res) {
  try {
    const { id } = req.params;
    const { title, author, rating, reviewText } = req.body;

    const updatedReview = await BookReviewModel.findByIdAndUpdate(
      id,
      { title, author, rating, reviewText },
      { new: true, runValidators: true }
    );

    if (!updatedReview) {
      return res.status(404).json({
        message: "Book review not found!",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Book review updated successfully!",
      data: updatedReview,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//Delete a bookReview by ID
export async function deleteBookReviewController(req, res) {
  try {
    const { id } = req.params;

    const deletedReview = await BookReviewModel.findByIdAndDelete(id);

    if (!deletedReview) {
      return res.status(404).json({
        message: "Book review not found!",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Book review deleted successfully!",
      data: deletedReview,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
