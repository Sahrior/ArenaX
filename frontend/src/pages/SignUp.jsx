import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("player");
  const [terms, setTerms] = useState(false);

const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    if (!terms) {
        alert("Please agree to the terms and conditions.");
        return;
    }

    const userData = {
        username,
        email,
        password,
        role
    };

    //console.log(userData);
    

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(userData)
      });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
        } else {
            alert(data.message);
        }

    } catch (error) {
        console.log(error);
        alert("Cannot connect to server!");
    }
};

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 md:p-10">

          <div className="mb-8 text-center">
            <h1 className="text-4xl font-black">
              Join <span className="text-red-500">ArenaX.</span>
            </h1>

            <p className="mt-3 text-sm text-zinc-500">
              Create your account and enter the competition.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Username */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Username
              </label>

              <input
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-red-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-red-500"
              />
            </div>

            {/* Password Row */}
            <div className="grid gap-5 md:grid-cols-2">

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-red-500"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-red-500"
                />
              </div>

            </div>

            {/* Account Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Account Type
              </label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none focus:border-red-500"
              >
                <option value="player">Player</option>
                <option value="organizer">Organizer</option>
              </select>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 text-xs leading-5 text-zinc-500">
              <input
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="mt-1 accent-red-500"
              />

              <span>
                I agree to the ArenaX terms and conditions.
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-lg bg-red-500 py-3.5 font-semibold transition hover:bg-red-600"
            >
              Create Account
            </button>

          </form>

          <div className="mt-7 text-center text-sm text-zinc-500">
            Already have an account?{" "}

            <Link
              to="/login"
              className="font-semibold text-red-500 hover:text-red-400"
            >
              Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SignUp;