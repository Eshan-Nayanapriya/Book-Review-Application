import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="h-20 shadow-md flex justify-between items-center px-4">
      <div className="text-xl font-bold">BookHive</div>
      <nav>
        <ul className="flex gap-4">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/reviews">Book Reviews</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;