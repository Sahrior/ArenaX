import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Teams() {

  const teams = [
    {
      name: "Team Entropy",
      game: "Dota 2",
      members: "5 Players",
    },
    {
      name: "Shadow Wolves",
      game: "League of Legends",
      members: "5 Players",
    },
    {
      name: "Nova Esports",
      game: "Mobile Legends",
      members: "5 Players",
    },
    {
      name: "Phoenix",
      game: "Dota 2",
      members: "5 Players",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <Navbar />

      <section className="border-b border-zinc-900 bg-zinc-900/30 px-6 py-32 text-center">

        <p className="mb-5 text-xs font-bold tracking-[0.3em] text-red-500">
          COMPETITIVE TEAMS
        </p>

        <h1 className="text-5xl font-black md:text-7xl">

          Meet the{" "}

          <span className="text-red-500">
            competitors.
          </span>

        </h1>

        <p className="mx-auto mt-7 max-w-2xl leading-7 text-zinc-500">
          Discover teams competing across the ArenaX
          esports community.
        </p>

      </section>


      <section className="mx-auto max-w-7xl px-6 py-24">

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {teams.map((team) => (

            <div
              key={team.name}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-7 text-center transition hover:-translate-y-1 hover:border-red-500/50"
            >

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-2xl font-black text-red-500">
                {team.name.charAt(0)}
              </div>

              <h3 className="mt-6 text-xl font-bold">
                {team.name}
              </h3>

              <p className="mt-2 text-sm text-red-500">
                {team.game}
              </p>

              <p className="mt-3 text-sm text-zinc-500">
                {team.members}
              </p>

              <button className="mt-6 w-full rounded-lg border border-zinc-700 py-3 text-sm font-semibold transition hover:border-red-500 hover:bg-red-500">
                View Team
              </button>

            </div>

          ))}

        </div>

      </section>

      <Footer />

    </div>
  );
}

export default Teams;