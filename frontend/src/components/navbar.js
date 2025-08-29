import { Link } from "react-router-dom";

export default function Navbar({ user }) {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold">
          TravelBuddy
        </Link>
        {user ? (<ul className="flex space-x-6">
          <li>
            <Link to="/my-plan" className="hover:text-gray-200">My Plan</Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-gray-200">Profile</Link>
          </li>
        </ul>) : (<></>)}
      </div>
    </nav>
  );
}
