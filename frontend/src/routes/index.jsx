import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import BookReviews from '../pages/BookReviews';
import Login from '../pages/Login';

// Define the router here
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Home /> },
      { path: 'reviews', element: <BookReviews /> },
      { path: 'login', element: <Login /> },
    ],
  },
]);

export default router; // Only export the router, no RouterProvider
