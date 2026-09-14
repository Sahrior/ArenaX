import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">

        {/* Brand */}
        <div className="md:col-span-2">

          <Link
            to="/"
            className="text-3xl font-black text-white"
          >
            Arena<span className="text-red-500">X</span>
          </Link>

          <p className="mt-4 max-w-md leading-7 text-zinc-500">
            A competitive esports tournament platform
            built for the MOBA community.
          </p>

        </div>

        {/* Explore */}
        <div>

          <h3 className="mb-5 font-semibold text-white">
            Explore
          </h3>

          <div className="flex flex-col gap-3">

            <Link
              to="/"
              className="text-sm text-zinc-500 transition hover:text-white"
            >
              Home
            </Link>

            <Link
              to="/tournaments"
              className="text-sm text-zinc-500 transition hover:text-white"
            >
              Tournaments
            </Link>

            <Link
              to="/teams"
              className="text-sm text-zinc-500 transition hover:text-white"
            >
              Teams
            </Link>

            <Link
              to="/free-agents"
              className="text-sm text-zinc-500 transition hover:text-white"
            >
              Free Agents
            </Link>

          </div>

        </div>

        {/* Account */}
        <div>

          <h3 className="mb-5 font-semibold text-white">
            Account
          </h3>

          <div className="flex flex-col gap-3">

            <Link
              to="/login"
              className="text-sm text-zinc-500 transition hover:text-white"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="text-sm text-zinc-500 transition hover:text-white"
            >
              Sign Up
            </Link>

            <Link
              to="/about"
              className="text-sm text-zinc-500 transition hover:text-white"
            >
              About Us
            </Link>

          </div>

        </div>

      </div>

      <div className="border-t border-zinc-900">

        <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-zinc-600">
          © 2026 ArenaX. All rights reserved.
        </div>

      </div>

    </footer>
  );
}

export default Footer;