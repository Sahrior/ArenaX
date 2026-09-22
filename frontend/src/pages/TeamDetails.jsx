import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TeamMemberCard from "../components/TeamMemberCard";
import { getTeamDetails } from "../api";

function TeamDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setErrorMsg("");
      try {
        const data = await getTeamDetails(id);
        setTeam(data);
      } catch (err) {
        console.error("Failed to load team details:", err);
        if (err.isUnauthenticated) {
          navigate("/login");
          return;
        }
        setErrorMsg(err.message || "Team not found or failed to load.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetails();
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-800 border-t-red-500 mb-4" />
          <p className="text-sm font-medium text-zinc-400">Loading team roster...</p>
        </div>
      </div>
    );
  }

  if (errorMsg || !team) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 text-zinc-500">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Team Not Found</h2>
          <p className="text-sm text-zinc-400 max-w-md mb-6">{errorMsg || "The team you are looking for does not exist."}</p>
          <Link
            to="/teams"
            className="rounded-xl bg-red-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            &larr; Back to My Teams
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const members = team.members || [];
  
  // Categorize roster members
  const captain = members.find((m) => (m.role || "").toLowerCase() === "captain");
  const mainRoster = members.filter(
    (m) => (m.role || "").toLowerCase() !== "captain" && !m.is_substitute
  );
  const substitutes = members.filter(
    (m) => (m.role || "").toLowerCase() !== "captain" && Boolean(m.is_substitute)
  );

  const isForming = (team.status || "").toLowerCase() === "forming";

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <Navbar />

      {/* Team Profile Banner */}
      <section className="border-b border-zinc-900 bg-gradient-to-b from-zinc-900/60 to-zinc-950 px-6 py-12">
        <div className="mx-auto max-w-5xl">
          {/* Back button */}
          <Link
            to="/teams"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to My Teams
          </Link>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              {/* Big Logo */}
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border border-red-500/30 bg-gradient-to-br from-red-500/20 to-zinc-900 text-4xl font-black text-red-500 shadow-2xl shadow-red-500/10">
                {team.team_name.charAt(0).toUpperCase()}
              </div>

              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                    {team.team_name}
                  </h1>
                  <span className="rounded-lg bg-zinc-900 border border-zinc-700 px-3 py-1 font-mono text-sm font-bold text-zinc-200">
                    [{team.team_tag}]
                  </span>
                </div>

                <div className="flex items-center gap-3 mt-3">
                  <span className="text-sm font-semibold text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full">
                    {team.game_name}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider border ${
                      isForming
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    }`}
                  >
                    STATUS: {team.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Status Summary Widget */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 min-w-[200px] text-right">
              <p className="text-xs text-zinc-400">Total Roster Size</p>
              <p className="text-2xl font-black text-white mt-1">{members.length} Players</p>
              <p className="text-[11px] text-zinc-500 mt-1">
                {isForming ? "Needs 5 members to activate" : "Roster fully active"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roster Sections */}
      <main className="mx-auto max-w-5xl w-full px-6 py-12 space-y-10 flex-1">
        {/* Section 1: Captain */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              TEAM CAPTAIN
            </h2>
            <p className="text-xs text-zinc-400">Team leader and roster administrator.</p>
          </div>

          {captain ? (
            <TeamMemberCard member={captain} />
          ) : (
            <p className="text-xs text-zinc-500 italic">No captain assigned.</p>
          )}
        </section>

        {/* Section 2: Main Roster */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                MAIN ROSTER ({mainRoster.length})
              </h2>
              <p className="text-xs text-zinc-400">Starting active competitive players.</p>
            </div>
          </div>

          {mainRoster.length === 0 ? (
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/20 p-8 text-center">
              <p className="text-sm font-medium text-zinc-400">Your main roster beyond the captain is currently empty.</p>
              <p className="text-xs text-zinc-500 mt-1">Additional players will appear here once added to the team.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {mainRoster.map((m) => (
                <TeamMemberCard key={m.account_id} member={m} />
              ))}
            </div>
          )}
        </section>

        {/* Section 3: Substitutes */}
        {substitutes.length > 0 && (
          <section>
            <div className="mb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                SUBSTITUTE PLAYERS ({substitutes.length})
              </h2>
              <p className="text-xs text-zinc-400">Backup and rotation squad members.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {substitutes.map((m) => (
                <TeamMemberCard key={m.account_id} member={m} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default TeamDetails;
