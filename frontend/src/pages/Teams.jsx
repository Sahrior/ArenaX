import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TeamCard from "../components/TeamCard";
import CreateTeamModal from "../components/CreateTeamModal";
import { getMyTeams, getGames } from "../api";

function Teams() {
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);

  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const navigate = useNavigate();

  const loadData = async () => {
    setLoading(true);
    try {
      const [fetchedTeams, fetchedGames] = await Promise.all([
        getMyTeams(),
        getGames(),
      ]);
      setTeams(fetchedTeams);
      setGames(fetchedGames);
    } catch (error) {
      console.error("Failed to load teams:", error);
      if (error.isUnauthenticated) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [navigate]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 4000);
  };

  const handleCreateSuccess = (newTeamId) => {
    loadData();
    showToast("Team created successfully!");
    if (newTeamId) {
      navigate(`/teams/${newTeamId}`);
    }
  };

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

      {/* Hero Header */}
      <section className="border-b border-zinc-900 bg-gradient-to-b from-zinc-900/40 to-zinc-950 px-6 py-20 text-center relative overflow-hidden">
        <div className="mx-auto max-w-4xl relative z-10">
          <p className="mb-4 text-xs font-bold tracking-[0.3em] text-red-500 uppercase">
            COMPETITIVE ROSTERS
          </p>

          <h1 className="text-4xl font-black md:text-6xl tracking-tight">
            MY <span className="text-red-500">TEAMS.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-zinc-400 text-sm md:text-base leading-relaxed">
            Build your roster. Represent your game. Compete against top teams across the ArenaX esports platform.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-6 py-3.5 font-bold text-white shadow-xl shadow-red-500/20 transition hover:bg-red-600 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
              </svg>
              Create Team
            </button>
          </div>
        </div>
      </section>

      {/* Main Roster Grid */}
      <main className="mx-auto max-w-7xl w-full px-6 py-16 flex-1">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-900">
          <div>
            <h2 className="text-xl font-bold text-white">Your Managed Teams</h2>
            <p className="text-xs text-zinc-400 mt-1">Teams you have created or joined as a competitor.</p>
          </div>
          <span className="text-xs font-mono font-semibold text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg">
            {teams.length} {teams.length === 1 ? "Team" : "Teams"} Total
          </span>
        </div>

        {loading ? (
          /* Loading State */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 animate-pulse" />
            ))}
          </div>
        ) : teams.length === 0 ? (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/20 p-16 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 text-zinc-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">You haven't joined or created a team yet.</h3>
            <p className="mt-2 text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
              Form your own competitive lineup or join a roster to start competing in MOBA esports tournaments.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600 shadow-lg shadow-red-500/20"
            >
              + Create Your First Team
            </button>
          </div>
        ) : (
          /* Teams Grid */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teams.map((team) => (
              <TeamCard key={team.team_id} team={team} />
            ))}
          </div>
        )}
      </main>

      {/* Create Team Modal */}
      <CreateTeamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleCreateSuccess}
        games={games}
      />

      <Footer />
    </div>
  );
}

export default Teams;