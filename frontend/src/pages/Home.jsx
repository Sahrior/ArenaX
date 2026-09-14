import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TournamentCard from "../components/TournamentCard";
import SectionTitle from "../components/SectionTitle";

function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <Navbar />

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden">

        {/* Background glow */}
        <div className="absolute left-1/2 top-0 -z-0 h-96 w-96 -translate-x-1/2 rounded-full bg-red-500/10 blur-3xl" />

        <div className="relative mx-auto flex min-h-[650px] max-w-7xl items-center px-6 py-24">

          <div className="max-w-3xl">

            <p className="mb-6 text-sm font-bold tracking-[0.3em] text-red-500">
              WELCOME TO ARENAX
            </p>

            <h1 className="text-6xl font-black leading-[0.95] tracking-tight md:text-8xl">

              Compete.
              <br />

              Conquer.
              <br />

              <span className="text-red-500">
                Become Legendary.
              </span>

            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-500">
              ArenaX is a competitive esports platform where
              players and teams can discover tournaments,
              compete against the best and build their legacy.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                to="/tournaments"
                className="rounded-lg bg-red-500 px-7 py-4 font-semibold transition hover:bg-red-600"
              >
                Explore Tournaments
              </Link>

              <Link
                to="/signup"
                className="rounded-lg border border-zinc-700 px-7 py-4 font-semibold transition hover:border-zinc-500"
              >
                Join ArenaX
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* ================= GAMES ================= */}

      <section className="border-y border-zinc-900 bg-zinc-950 py-24">

        <div className="mx-auto max-w-7xl px-6">

          <SectionTitle
            label="CHOOSE YOUR BATTLE"
            title={
              <>
                Compete in your favorite{" "}
                <span className="text-red-500">
                  MOBA games
                </span>
              </>
            }
          />

          <div className="grid gap-6 md:grid-cols-3">

            {[
              {
                name: "Dota 2",
                description:
                  "Battle for victory in intense competitive matches.",
              },
              {
                name: "League of Legends",
                description:
                  "Build your team and dominate the competition.",
              },
              {
                name: "Mobile Legends",
                description:
                  "Find tournaments and compete with other players.",
              },
            ].map((game) => (

              <div
                key={game.name}
                className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 transition hover:-translate-y-1 hover:border-red-500/50"
              >

                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl bg-red-500/10 font-black text-red-500">
                  {game.name.charAt(0)}
                </div>

                <h3 className="text-2xl font-bold">
                  {game.name}
                </h3>

                <p className="mt-4 leading-7 text-zinc-500">
                  {game.description}
                </p>

                <Link
                  to="/tournaments"
                  className="mt-6 inline-block font-semibold text-red-500"
                >
                  Explore →
                </Link>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================= TOURNAMENTS ================= */}

      <section className="py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-12 flex items-end justify-between">

            <div>

              <p className="mb-3 text-xs font-bold tracking-[0.3em] text-red-500">
                COMPETE NOW
              </p>

              <h2 className="text-4xl font-black md:text-5xl">
                Featured Tournaments
              </h2>

            </div>

            <Link
              to="/tournaments"
              className="hidden font-semibold text-red-500 sm:block"
            >
              View All →
            </Link>

          </div>

          <div className="grid gap-6 lg:grid-cols-3">

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

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section className="border-y border-zinc-900 bg-zinc-900/30 py-24">

        <div className="mx-auto max-w-7xl px-6">

          <SectionTitle
            label="WHY ARENAX?"
            title={
              <>
                Everything you need to{" "}
                <span className="text-red-500">
                  compete.
                </span>
              </>
            }
          />

          <div className="grid gap-6 md:grid-cols-3">

            {[
              {
                number: "01",
                title: "Competitive Tournaments",
                description:
                  "Discover organized tournaments and compete against teams from the community.",
              },
              {
                number: "02",
                title: "Build Your Team",
                description:
                  "Create your team, manage your roster and recruit players to strengthen your lineup.",
              },
              {
                number: "03",
                title: "Transparent Results",
                description:
                  "Follow tournament brackets, matches and confirmed results in one place.",
              },
            ].map((feature) => (

              <div
                key={feature.number}
                className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8"
              >

                <span className="text-sm font-bold text-red-500">
                  {feature.number}
                </span>

                <h3 className="mt-8 text-xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-zinc-500">
                  {feature.description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      <Footer />

    </div>
  );
}

export default Home;