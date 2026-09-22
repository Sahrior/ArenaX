import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GameAccountCard from "../components/GameAccountCard";
import GameAccountModal from "../components/GameAccountModal";
import { getMe, getMyGameAccounts, getGames, logoutUser } from "../api";

function Profile() {
  const [user, setUser] = useState(null);
  const [gameAccounts, setGameAccounts] = useState([]);
  const [games, setGames] = useState([]);

  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingAccounts, setLoadingAccounts] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);

  const [toastMessage, setToastMessage] = useState("");

  const navigate = useNavigate();

  // Load User Info
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getMe();
        setUser(data.user);
      } catch (error) {
        console.error("Failed to load user profile:", error);
        navigate("/login");
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Load Games & Game Accounts
  const loadGameData = async () => {
    setLoadingAccounts(true);
    try {
      const [fetchedAccounts, fetchedGames] = await Promise.all([
        getMyGameAccounts(),
        getGames(),
      ]);
      setGameAccounts(fetchedAccounts);
      setGames(fetchedGames);
    } catch (error) {
      console.error("Failed to load game accounts:", error);
      if (error.isUnauthenticated) {
        navigate("/login");
      }
    } finally {
      setLoadingAccounts(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadGameData();
    }
  }, [user]);

  const showSuccessToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 4000);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.error(error);
      navigate("/login");
    }
  };

  const handleOpenAddModal = () => {
    setEditingAccount(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (account) => {
    setEditingAccount(account);
    setIsModalOpen(true);
  };

  const handleModalSuccess = () => {
    loadGameData();
    showSuccessToast(
      editingAccount
        ? "Game account updated successfully!"
        : "Game account added successfully!"
    );
  };

  if (loadingUser) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-800 border-t-red-500 mb-4" />
          <p className="text-sm font-medium text-zinc-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <Navbar />

      {/* Success Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-950/90 px-5 py-3.5 text-sm text-emerald-300 shadow-2xl backdrop-blur-md animate-fade-in">
          <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Hero Banner */}
      <section className="relative border-b border-zinc-900 bg-gradient-to-b from-zinc-900/60 to-zinc-950 px-6 py-12">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          {/* User Info Header */}
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-red-700 text-3xl font-black text-white shadow-xl shadow-red-500/10 border border-red-400/20">
              {user.username.charAt(0).toUpperCase()}
            </div>

            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl font-black tracking-tight text-white">
                  Welcome, <span className="text-red-500">{user.username}</span>
                </h1>
                <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-400 border border-red-500/20">
                  {user.role}
                </span>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/20">
                  {user.account_status}
                </span>
              </div>
              <p className="mt-1 text-sm text-zinc-400">
                ArenaX Esports Competitor Dashboard
              </p>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-zinc-300 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl w-full px-6 py-12 space-y-12 flex-1">
        {/* Section 1: Personal Information */}
        <section>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              Personal Information
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Your registered platform user details.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4">
              <p className="text-xs font-medium text-zinc-500">User ID</p>
              <p className="mt-1.5 font-mono text-sm font-semibold text-white">#{user.user_id}</p>
            </div>

            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4">
              <p className="text-xs font-medium text-zinc-500">Username</p>
              <p className="mt-1.5 text-sm font-semibold text-white">{user.username}</p>
            </div>

            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4">
              <p className="text-xs font-medium text-zinc-500">Email Address</p>
              <p className="mt-1.5 text-sm font-semibold text-white truncate">{user.email}</p>
            </div>

            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4">
              <p className="text-xs font-medium text-zinc-500">Platform Role</p>
              <p className="mt-1.5 text-sm font-semibold capitalize text-white">{user.role}</p>
            </div>

            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4">
              <p className="text-xs font-medium text-zinc-500">Account Status</p>
              <p className="mt-1.5 text-sm font-semibold capitalize text-emerald-400">{user.account_status}</p>
            </div>
          </div>
        </section>

        {/* Section 2: My Game Accounts */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                My Game Accounts
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Link your MOBA game accounts to join competitive teams and enter tournaments.
              </p>
            </div>

            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-600 self-start sm:self-auto"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
              </svg>
              Add Game Account
            </button>
          </div>

          {loadingAccounts ? (
            /* Loading State */
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2].map((i) => (
                <div key={i} className="h-56 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 animate-pulse" />
              ))}
            </div>
          ) : gameAccounts.length === 0 ? (
            /* Empty State */
            <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/20 p-12 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 text-zinc-500">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 4a2 2 0 114 0v1a2 2 0 002 2h3a1 1 0 011 1v3a2 2 0 01-2 2h-1a2 2 0 100 4h1a2 2 0 012 2v3a1 1 0 01-1 1h-3a2 2 0 01-2-2v-1a2 2 0 10-4 0v1a2 2 0 01-2 2H4a1 1 0 01-1-1v-3a2 2 0 012-2h1a2 2 0 100-4H4a2 2 0 01-2-2V7a1 1 0 011-1h3a2 2 0 012-2V4z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white">You haven't linked any game accounts yet.</h3>
              <p className="mt-1 text-sm text-zinc-400 max-w-md mx-auto">
                Link your game accounts (Dota 2, LoL, MLBB, HOK) to build rosters or sign up as a free agent.
              </p>
              <button
                onClick={handleOpenAddModal}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
              >
                + Add Game Account
              </button>
            </div>
          ) : (
            /* Game Accounts Grid */
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gameAccounts.map((account) => {
                const matchedGame = games.find(
                  (g) => String(g.game_id) === String(account.game_id)
                );
                return (
                  <GameAccountCard
                    key={account.account_id}
                    account={account}
                    game={matchedGame}
                    onEdit={handleOpenEditModal}
                  />
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* Add / Edit Game Account Modal */}
      <GameAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleModalSuccess}
        editingAccount={editingAccount}
        games={games}
      />

      <Footer />
    </div>
  );
}

export default Profile;