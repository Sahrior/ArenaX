import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function FreeAgents() {

  const players = [
    {
      name: "Shadow",
      game: "Dota 2",
      role: "Carry",
      university: "UIU",
    },
    {
      name: "Nova",
      game: "League of Legends",
      role: "Mid",
      university: "BRAC University",
    },
    {
      name: "Rex",
      game: "Mobile Legends",
      role: "Tank",
      university: "NSU",
    },
    {
      name: "Blaze",
      game: "Dota 2",
      role: "Support",
      university: "UIU",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <Navbar />

      <section className="border-b border-zinc-900 bg-zinc-900/30 px-6 py-32 text-center">

        <p className="mb-5 text-xs font-bold tracking-[0.3em] text-red-500">
          PLAYER RECRUITMENT
        </p>

        <h1 className="text-5xl font-black md:text-7xl">

          Find your next{" "}

          <span className="text-red-500">
            teammate.
          </span>

        </h1>

        <p className="mx-auto mt-7 max-w-2xl leading-7 text-zinc-500">
          Discover players looking for competitive teams.
        </p>

      </section>


      <section className="mx-auto max-w-7xl px-6 py-24">

        <div className="mb-10 flex flex-wrap gap-3">

          <button className="rounded-lg bg-red-500 px-5 py-2.5 text-sm font-semibold">
            All Players
          </button>

          <button className="rounded-lg border border-zinc-800 px-5 py-2.5 text-sm text-zinc-400 hover:text-white">
            Dota 2
          </button>

          <button className="rounded-lg border border-zinc-800 px-5 py-2.5 text-sm text-zinc-400 hover:text-white">
            League of Legends
          </button>

          <button className="rounded-lg border border-zinc-800 px-5 py-2.5 text-sm text-zinc-400 hover:text-white">
            Mobile Legends
          </button>

        </div>


        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {players.map((player) => (

            <div
              key={player.name}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-7 text-center transition hover:-translate-y-1 hover:border-red-500/50"
            >

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-2xl font-black text-red-500">
                {player.name.charAt(0)}
              </div>

              <h3 className="mt-6 text-xl font-bold">
                {player.name}
              </h3>

              <p className="mt-2 text-sm text-red-500">
                {player.game}
              </p>

              <div className="mt-5 space-y-2 text-sm text-zinc-500">

                <p>
                  Role: {player.role}
                </p>

                <p>
                  {player.university}
                </p>

              </div>

              <button className="mt-6 w-full rounded-lg border border-zinc-700 py-3 text-sm font-semibold transition hover:border-red-500 hover:bg-red-500">
                View Profile
              </button>

            </div>

          ))}

        </div>

      </section>

      <Footer />

    </div>
  );
}

export default FreeAgents;