import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/me", {
          credentials: "include"
        });

        const data = await response.json();

        if (!response.ok) {
          navigate("/login");
          return;
        }

        setUser(data.user);

      } catch (error) {
        console.log(error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include"
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        navigate("/login");
      }

    } catch (error) {
      console.log(error);
      alert("Cannot connect to server!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        <Navbar />

        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center">
          <p className="text-zinc-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <Navbar />

      <div className="flex items-center justify-center px-6 py-16">

        <div className="w-full max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 md:p-10">

          <div className="mb-8 text-center">

            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 text-3xl font-black text-red-500">
              {user.username.charAt(0).toUpperCase()}
            </div>

            <h1 className="text-3xl font-black">
              Welcome, <span className="text-red-500">{user.username}</span>
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Your ArenaX profile
            </p>

          </div>


          <div className="space-y-4">

            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-xs text-zinc-500">User ID</p>
              <p className="mt-1 font-medium text-white">
                {user.user_id}
              </p>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-xs text-zinc-500">Username</p>
              <p className="mt-1 font-medium text-white">
                {user.username}
              </p>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-xs text-zinc-500">Email</p>
              <p className="mt-1 font-medium text-white">
                {user.email}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">

              <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-xs text-zinc-500">Role</p>
                <p className="mt-1 font-medium capitalize text-white">
                  {user.role}
                </p>
              </div>

              <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-xs text-zinc-500">Account Status</p>
                <p className="mt-1 font-medium capitalize text-white">
                  {user.account_status}
                </p>
              </div>

            </div>

          </div>


          <button
            onClick={handleLogout}
            className="mt-8 w-full rounded-lg bg-red-500 py-3.5 font-semibold transition hover:bg-red-600"
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default Profile;