import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { getUserInfo, loggedOut } from "../auth/auth.service";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();
  const user = getUserInfo();

  useEffect(() => {
    if (user) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [user]);

  const handleLogout = () => {
    loggedOut();
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and primary nav */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                SkillPath
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {user ? (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center px-1 pt-1 text-gray-700 hover:text-blue-600"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/"
                  className="inline-flex items-center px-1 pt-1 text-gray-700 hover:text-blue-600"
                >
                  Home
                </Link>
              )}
              <Link
                to="/about"
                className="inline-flex items-center px-1 pt-1 text-gray-700 hover:text-blue-600"
              >
                About
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center px-1 pt-1 text-gray-700 hover:text-blue-600"
              >
                Courses
              </Link>
            </div>
          </div>

          {/* Secondary Navigation - Auth & Profile */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {isLogged ? (
              <>
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              to="/courses"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              onClick={toggleMenu}
            >
              Courses
            </Link>
            {isLogged ? (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                  onClick={toggleMenu}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout;
                    toggleMenu();
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                onClick={toggleMenu}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
