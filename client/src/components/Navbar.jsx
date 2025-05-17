import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Détecte le défilement pour changer l'apparence de la navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ferme le menu mobile lors du changement de route
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Vérifie si le lien est actif
  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-2 bg-black/80 backdrop-blur-md shadow-lg"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center" aria-label="Home">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <span className="text-pink-500 font-bold text-xl mr-1">TheEnd</span>
            <span className="text-white text-xl">.page</span>
          </motion.div>
        </Link>

        {/* Navigation desktop */}
        <div className="hidden lg:flex items-center space-x-1">
          <NavLinks isActive={isActive} />

          {/* CTA Button */}
          <Link to="/create">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-6 px-6 py-2 bg-gradient-to-r from-pink-600 to-pink-500 text-white font-medium rounded-lg shadow-lg shadow-pink-500/20"
            >
              Create Page
            </motion.button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-md"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-lg border-t border-pink-500/20">
          <div className="container mx-auto px-4 py-4">
            <ul className="flex flex-col space-y-4">
              <MobileNavLinks isActive={isActive} />
              <li className="pt-2">
                <Link
                  to="/create"
                  className="block w-full text-center py-3 bg-gradient-to-r from-pink-600 to-pink-500 text-white font-medium rounded-lg"
                >
                  Create Page
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </motion.nav>
  );
};

// Desktop navigation links
const NavLinks = ({ isActive }) => {
  const links = [
    { path: "/", label: "Home" },
    { path: "/examples", label: "Examples" },
    { path: "/about", label: "About" },
  ];

  return links.map((link) => (
    <Link key={link.path} to={link.path}>
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
        className={`px-4 py-2 rounded-md transition-colors duration-200 ${
          isActive(link.path)
            ? "text-pink-400 font-medium"
            : "text-white/80 hover:text-white"
        }`}
      >
        {link.label}
        {isActive(link.path) && (
          <motion.div
            layoutId="activeIndicator"
            className="h-0.5 bg-pink-500 mt-1 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>
    </Link>
  ));
};

// Mobile navigation links
const MobileNavLinks = ({ isActive }) => {
  const links = [
    { path: "/", label: "Home" },
    { path: "/examples", label: "Examples" },
    { path: "/about", label: "About" },
  ];

  return links.map((link) => (
    <li key={link.path}>
      <Link
        to={link.path}
        className={`block px-4 py-3 rounded-md ${
          isActive(link.path)
            ? "bg-pink-500/10 text-pink-400 font-medium border-l-2 border-pink-500"
            : "text-white/80 hover:bg-white/5"
        }`}
      >
        {link.label}
      </Link>
    </li>
  ));
};

export default Navbar;
