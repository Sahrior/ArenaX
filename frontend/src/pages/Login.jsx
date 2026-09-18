import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password
    };

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(loginData)
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        console.log("Logged in user:", data.user);

        navigate("/profile");
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

      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-16">

        <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 md:p-10">

          {/* Header */}

          <div className="mb-8 text-center">

            <h1 className="text-4xl font-black">
              Welcome <span className="text-red-500">Back.</span>
            </h1>

            <p className="mt-3 text-sm text-zinc-500">
              Login to continue your ArenaX journey.
            </p>

          </div>


          <form onSubmit={handleSubmit} className="space-y-5">

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


            {/* Password */}

            <div>

              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-red-500"
              />

            </div>


            {/* Options */}

            <div className="flex items-center justify-between text-xs">

              <label className="flex items-center gap-2 text-zinc-500">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-red-500"
                />

                Remember me

              </label>

              <a
                href="#"
                className="text-red-500 hover:text-red-400"
              >
                Forgot Password?
              </a>

            </div>


            {/* Submit */}

            <button
              type="submit"
              className="w-full rounded-lg bg-red-500 py-3.5 font-semibold transition hover:bg-red-600"
            >
              Login
            </button>

          </form>


          {/* Footer */}

          <div className="mt-7 text-center text-sm text-zinc-500">

            Don't have an account?{" "}

            <Link
              to="/signup"
              className="font-semibold text-red-500 hover:text-red-400"
            >
              Create an account
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;