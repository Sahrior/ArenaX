import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-black tracking-tight text-white"
        >
          Arena<span className="text-red-500">X</span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          <Link
            to="/"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            About Us
          </Link>

          <Link
            to="/tournaments"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            Tournaments
          </Link>

          <Link
            to="/teams"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            Teams
          </Link>

          <Link
            to="/free-agents"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            Free Agents
          </Link>

        </div>

        {/* Auth buttons */}
        <div className="flex items-center gap-3">

          <Link
            to="/login"
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-white transition hover:border-zinc-500"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            Sign Up
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;