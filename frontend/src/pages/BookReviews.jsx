import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    rating: 1,
    reviewText: '',
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('/api/reviews');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/reviews', formData);
      fetchReviews();
      setFormData({ title: '', author: '', rating: 1, reviewText: '' });
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/reviews/${id}`);
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Book Reviews</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="block mb-2 p-2 border"
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
          className="block mb-2 p-2 border"
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating (1-5)"
          value={formData.rating}
          onChange={handleChange}
          required
          className="block mb-2 p-2 border"
          min="1"
          max="5"
        />
        <textarea
          name="reviewText"
          placeholder="Review"
          value={formData.reviewText}
          onChange={handleChange}
          required
          className="block mb-2 p-2 border"
        ></textarea>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Submit
        </button>
      </form>
      <ul>
        {Array.isArray(reviews) && reviews.map((review) => (
          <li key={review.id} className="mb-4 border p-4">
            <h3 className="text-xl">{review.title}</h3>
            <p>Author: {review.author}</p>
            <p>Rating: {review.rating}</p>
            <p>{review.reviewText}</p>
            <button
              onClick={() => handleDelete(review.id)}
              className="bg-red-500 text-white px-4 py-2 mt-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookReviews;