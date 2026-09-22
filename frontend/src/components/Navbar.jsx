import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getMe, logoutUser } from "../api";

function Navbar() {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  // Check authentication using GET /api/auth/me
  const fetchAuthStatus = async () => {
    try {
      const data = await getMe();
      if (data && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoadingAuth(false);
    }
  };

  useEffect(() => {
    fetchAuthStatus();

    // Listen for custom auth change events across components
    const handleAuthChange = () => {
      fetchAuthStatus();
    };

    window.addEventListener("auth-change", handleAuthChange);

    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, []);

  // Close dropdown on location change
  useEffect(() => {
    setDropdownOpen(false);
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      window.dispatchEvent(new Event("auth-change"));
      navigate("/login");
    }
  };

  return (
    <nav className="border-b border-zinc-800 bg-zinc-950 sticky top-0 z-40 backdrop-blur-md bg-zinc-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-black tracking-tight text-white flex items-center gap-1 group"
        >
          Arena<span className="text-red-500 group-hover:scale-110 transition duration-200">X</span>
        </Link>

        {/* Primary Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">

          <Link
            to="/"
            className={`text-sm font-medium transition ${
              isActive("/") ? "text-white font-bold" : "text-zinc-400 hover:text-white"
            }`}
          >
            Home
          </Link>

          <Link
            to="/about"
            className={`text-sm font-medium transition ${
              isActive("/about") ? "text-white font-bold" : "text-zinc-400 hover:text-white"
            }`}
          >
            About Us
          </Link>

          <Link
            to="/tournaments"
            className={`text-sm font-medium transition ${
              isActive("/tournaments") ? "text-white font-bold" : "text-zinc-400 hover:text-white"
            }`}
          >
            Tournaments
          </Link>

          <Link
            to="/teams"
            className={`text-sm font-medium transition ${
              isActive("/teams") ? "text-white font-bold" : "text-zinc-400 hover:text-white"
            }`}
          >
            Teams
          </Link>

          <Link
            to="/free-agents"
            className={`text-sm font-medium transition ${
              isActive("/free-agents") ? "text-white font-bold" : "text-zinc-400 hover:text-white"
            }`}
          >
            Free Agents
          </Link>

        </div>

        {/* Authentication Section (Right side) */}
        <div className="flex items-center gap-3 relative" ref={dropdownRef}>
          {loadingAuth ? (
            /* Loading Skeleton State */
            <div className="h-9 w-24 animate-pulse rounded-lg bg-zinc-800/60" />
          ) : user ? (
            /* AUTHENTICATED STATE: Profile Dropdown Menu */
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-sm font-semibold text-white transition hover:border-zinc-700 hover:bg-zinc-800/80"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-black text-white">
                  {user.username ? user.username.charAt(0).toUpperCase() : "U"}
                </div>
                <span>Profile</span>
                <svg
                  className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180 text-red-500" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Profile Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-zinc-800 bg-zinc-950 p-1.5 shadow-2xl backdrop-blur-xl animate-fade-in z-50">
                  <div className="px-3 py-2 border-b border-zinc-900 mb-1">
                    <p className="text-xs font-bold text-white truncate">{user.username}</p>
                    <p className="text-[11px] text-zinc-500 truncate">{user.email}</p>
                  </div>

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/profile");
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-zinc-300 transition hover:bg-red-500/10 hover:text-red-400 text-left"
                  >
                    <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Visit Profile
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-500/10 hover:text-red-300 text-left"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* UNAUTHENTICATED STATE: Login & Sign Up Buttons */
            <>
              <Link
                to="/login"
                className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-white transition hover:border-zinc-500 hover:bg-zinc-900"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 shadow-md shadow-red-500/20"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;