const API_BASE_URL = "http://localhost:5000/api";

/**
 * Custom error class for API response errors
 */
export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

/**
 * Generic fetch wrapper with credentials: "include" and 401 handling
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const config = {
    credentials: "include",
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      // 401 Unauthorized handling
      if (response.status === 401) {
        const error = new ApiError(data.error || data.message || "Unauthorized", 401, data);
        error.isUnauthenticated = true;
        throw error;
      }
      const errorMessage = data.error || data.message || `Request failed with status ${response.status}`;
      throw new ApiError(errorMessage, response.status, data);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(error.message || "Unable to connect to ArenaX server.", 0, null);
  }
}

// Authentication APIs
export async function getMe() {
  return request("/auth/me");
}

export async function logoutUser() {
  return request("/auth/logout", { method: "POST" });
}

// Game APIs
export async function getGames() {
  const data = await request("/games");
  // Backend returns { game: [...] }
  return data.game || [];
}

// Game Account Management APIs
export async function getMyGameAccounts() {
  const data = await request("/game-accounts/my");
  // Backend returns { gameAccounts: [...] }
  return data.gameAccounts || [];
}

export async function createGameAccount(accountData) {
  // accountData: { game_id, game_username, game_uid, server_region, is_free_agent, university }
  return request("/game-accounts", {
    method: "POST",
    body: JSON.stringify(accountData),
  });
}

export async function updateGameAccount(accountId, accountData) {
  // accountData: { game_username, game_uid, server_region } (game_id is NOT sent/editable)
  return request(`/game-accounts/${accountId}`, {
    method: "PUT",
    body: JSON.stringify(accountData),
  });
}

// Team Management APIs
export async function getMyTeams() {
  const data = await request("/teams/my");
  // Backend returns { teams: [...] }
  return data.teams || [];
}

export async function createTeam(teamData) {
  // teamData: { game_id, team_name, team_tag }
  return request("/teams", {
    method: "POST",
    body: JSON.stringify(teamData),
  });
}

export async function getTeamDetails(teamId) {
  const data = await request(`/teams/${teamId}`);
  // Backend returns { team: { team_id, team_name, team_tag, status, game_name, members: [...] } }
  return data.team;
}
