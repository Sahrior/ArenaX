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
  return data.game || [];
}

// Game Account Management APIs
export async function getMyGameAccounts() {
  const data = await request("/game-accounts/my");
  return data.gameAccounts || [];
}

export async function createGameAccount(accountData) {
  return request("/game-accounts", {
    method: "POST",
    body: JSON.stringify(accountData),
  });
}

export async function updateGameAccount(accountId, accountData) {
  return request(`/game-accounts/${accountId}`, {
    method: "PUT",
    body: JSON.stringify(accountData),
  });
}

// Team Management APIs
export async function getMyTeams() {
  const data = await request("/teams/my");
  return data.teams || [];
}

export async function createTeam(teamData) {
  return request("/teams", {
    method: "POST",
    body: JSON.stringify(teamData),
  });
}

export async function getTeamDetails(teamId) {
  const data = await request(`/teams/${teamId}`);
  return data.team;
}

// Free Agent Management & Discovery APIs
export async function getFreeAgents(filters = {}) {
  const params = new URLSearchParams();
  if (filters.game_id) params.append("game_id", filters.game_id);
  if (filters.preferred_role) params.append("preferred_role", filters.preferred_role);
  if (filters.university) params.append("university", filters.university);
  if (filters.search) params.append("search", filters.search);

  const queryString = params.toString();
  const endpoint = queryString ? `/free-agents?${queryString}` : "/free-agents";
  const data = await request(endpoint);
  return data.freeAgents || [];
}

export async function getMyFreeAgents() {
  const data = await request("/free-agents/my");
  return data.freeAgents || [];
}

export async function createFreeAgentProfile(profileData) {
  return request("/free-agents", {
    method: "POST",
    body: JSON.stringify(profileData),
  });
}

export async function updateFreeAgentProfile(id, profileData) {
  return request(`/free-agents/${id}`, {
    method: "PUT",
    body: JSON.stringify(profileData),
  });
}

export async function deleteFreeAgentProfile(id) {
  return request(`/free-agents/${id}`, {
    method: "DELETE",
  });
}

// Team Invitation APIs
export async function sendTeamInvitation(invitationData) {
  // invitationData: { team_id, game_account_id }
  return request("/team-invitations", {
    method: "POST",
    body: JSON.stringify(invitationData),
  });
}

export async function getMyTeamInvitations() {
  const data = await request("/team-invitations/my");
  return data.invitations || [];
}

export async function acceptTeamInvitation(id) {
  return request(`/team-invitations/${id}/accept`, {
    method: "POST",
  });
}

export async function rejectTeamInvitation(id) {
  return request(`/team-invitations/${id}/reject`, {
    method: "POST",
  });
}
