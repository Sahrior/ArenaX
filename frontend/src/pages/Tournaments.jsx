import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TournamentCard from "../components/TournamentCard";

function Tournaments() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <Navbar />

      {/* Hero */}

      <section className="border-b border-zinc-900 bg-zinc-900/30 px-6 py-32 text-center">

        <p className="mb-5 text-xs font-bold tracking-[0.3em] text-red-500">
          ARENAX TOURNAMENTS
        </p>

        <h1 className="text-5xl font-black md:text-7xl">

          Find your next{" "}

          <span className="text-red-500">
            challenge.
          </span>

        </h1>

        <p className="mx-auto mt-7 max-w-2xl leading-7 text-zinc-500">
          Discover upcoming tournaments and compete
          against the best teams.
        </p>

      </section>


      {/* Tournaments */}

      <section className="mx-auto max-w-7xl px-6 py-24">

        {/* Filters */}

        <div className="mb-10 flex flex-wrap gap-3">

          <button className="rounded-lg bg-red-500 px-5 py-2.5 text-sm font-semibold">
            All Games
          </button>

          <button className="rounded-lg border border-zinc-800 px-5 py-2.5 text-sm text-zinc-400 transition hover:border-zinc-600 hover:text-white">
            Dota 2
          </button>

          <button className="rounded-lg border border-zinc-800 px-5 py-2.5 text-sm text-zinc-400 transition hover:border-zinc-600 hover:text-white">
            League of Legends
          </button>

          <button className="rounded-lg border border-zinc-800 px-5 py-2.5 text-sm text-zinc-400 transition hover:border-zinc-600 hover:text-white">
            Mobile Legends
          </button>

        </div>


        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          <TournamentCard
            game="DOTA 2"
            title="ArenaX Winter Championship"
            status="Registration Open"
            teams="32 Teams"
            date="Oct 12, 2026"
          />

          <TournamentCard
            game="LEAGUE OF LEGENDS"
            title="ArenaX University Cup"
            status="Registration Open"
            teams="16 Teams"
            date="Oct 20, 2026"
          />

          <TournamentCard
            game="MOBILE LEGENDS"
            title="ArenaX Mobile Clash"
            status="Coming Soon"
            teams="32 Teams"
            date="Nov 05, 2026"
          />

          <TournamentCard
            game="DOTA 2"
            title="Campus Battle 2026"
            status="Registration Open"
            teams="16 Teams"
            date="Nov 15, 2026"
          />

          <TournamentCard
            game="LEAGUE OF LEGENDS"
            title="University League"
            status="Coming Soon"
            teams="24 Teams"
            date="Dec 01, 2026"
          />

          <TournamentCard
            game="MOBILE LEGENDS"
            title="ArenaX Winter Clash"
            status="Coming Soon"
            teams="32 Teams"
            date="Dec 10, 2026"
          />

        </div>

      </section>

      <Footer />

    </div>
  );
}

export default Tournaments;