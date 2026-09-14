function TournamentCard({
  game,
  title,
  status,
  teams,
  date,
}) {
  return (
    <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 transition duration-300 hover:-translate-y-1 hover:border-red-500/50">

      {/* Game */}
      <div className="mb-6 flex items-center justify-between">

        <span className="text-xs font-bold tracking-widest text-red-500">
          {game}
        </span>

        <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-400">
          {status}
        </span>

      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-white">
        {title}
      </h3>

      {/* Info */}
      <div className="mt-5 space-y-3 text-sm text-zinc-500">

        <div className="flex justify-between">
          <span>Teams</span>
          <span className="text-zinc-300">
            {teams}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Date</span>
          <span className="text-zinc-300">
            {date}
          </span>
        </div>

      </div>

      {/* Button */}
      <button className="mt-6 w-full rounded-lg border border-zinc-700 py-3 text-sm font-semibold text-white transition hover:border-red-500 hover:bg-red-500">
        View Tournament
      </button>

    </div>
  );
}

export default TournamentCard;