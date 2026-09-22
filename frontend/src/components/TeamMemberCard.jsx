import React from "react";

function TeamMemberCard({ member }) {
  // member: { account_id, game_username, role, is_substitute, is_active }
  const isCaptain = (member.role || "").toLowerCase() === "captain";
  const isActive = Boolean(member.is_active);
  const isSubstitute = Boolean(member.is_substitute);

  return (
    <div className={`flex items-center justify-between rounded-xl border p-4 transition ${
      isCaptain 
        ? "border-red-500/30 bg-red-500/5 hover:border-red-500/50" 
        : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"
    }`}>
      <div className="flex items-center gap-3.5">
        {/* Avatar */}
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-black text-lg ${
          isCaptain 
            ? "bg-red-500 text-white shadow-lg shadow-red-500/20" 
            : "bg-zinc-800 text-zinc-300 border border-zinc-700"
        }`}>
          {(member.game_username || "P").charAt(0).toUpperCase()}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-white text-base">
              {member.game_username}
            </h4>
            
            {/* Role Badge */}
            <span className={`px-2 py-0.5 text-[11px] font-bold uppercase rounded border ${
              isCaptain 
                ? "bg-red-500/20 text-red-400 border-red-500/30" 
                : "bg-zinc-800 text-zinc-300 border-zinc-700"
            }`}>
              {member.role || "Player"}
            </span>
          </div>

          <p className="text-xs text-zinc-500 mt-0.5">
            Account ID: #{member.account_id}
          </p>
        </div>
      </div>

      {/* Status Badges */}
      <div className="flex items-center gap-2">
        {/* Substitute status */}
        {isSubstitute && (
          <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20">
            Substitute
          </span>
        )}

        {/* Active status */}
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold border ${
          isActive 
            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
            : "bg-zinc-800 text-zinc-500 border-zinc-700"
        }`}>
          <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-emerald-400" : "bg-zinc-500"}`} />
          {isActive ? "Active" : "Inactive"}
        </span>
      </div>
    </div>
  );
}

export default TeamMemberCard;
