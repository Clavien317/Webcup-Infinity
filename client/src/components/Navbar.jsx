import { Link } from "react-router-dom";
import { useState } from "react";
import { Moon, Sun, LogOut, User } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { cn } from "../lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  // Fonction pour obtenir l'avatar avec la première lettre de l'email
  const getInitial = (email) => {
    return email ? email.charAt(0).toUpperCase() : "U";
  };

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full backdrop-blur-sm z-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl text-primary">TheEnd</span>
              <span className="text-xl">.page</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex space-x-4">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link
                to="/examples"
                className="px-3 py-2 rounded-md text-sm font-medium"
              >
                Hall
              </Link>
              <Link
                to="/how-it-works"
                className="px-3 py-2 rounded-md text-sm font-medium"
              >
                How It Works
              </Link>
              <Link
                to="/about"
                className="px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </Link>
            </div>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-white",
                      "bg-gradient-to-r from-pink-500 to-purple-600"
                    )}
                  >
                    {getInitial(user?.email)}
                  </div>
                  <span className="text-sm font-medium">{user?.nom}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-red-500 hover:text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link to="/auth" className="btn btn-primary">
                Login
              </Link>
            )}

            <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input
                type="checkbox"
                className="theme-controller"
                value="night"
              />

              {/* sun icon */}
              <Sun className="swap-off" />

              {/* moon icon */}
              <Moon className="swap-on" />
            </label>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/examples"
              className="block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Hall
            </Link>
            <Link
              to="/how-it-works"
              className="block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>

            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2 px-3 py-2">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-white",
                      "bg-gradient-to-r from-pink-500 to-purple-600"
                    )}
                  >
                    {getInitial(user?.email)}
                  </div>
                  <span className="text-base font-medium">{user?.nom}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium text-red-500"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="btn btn-primary w-full"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}

            <Link
              to="/create"
              className="btn btn-primary"
              onClick={() => setIsOpen(false)}
            >
              Create Page
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
