const express = require("express");
const db = require("../config/db");
const { requireAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/my", requireAuth, (req, res) => {
    const userId = req.session.userId;
    const sql = `
    SELECT
        t.team_id,
        t.team_name,
        t.team_tag,
        t.status,
        g.game_name,
        tm.role,
        tm.is_substitute,
        tm.is_active
    FROM TEAM_MEMBER tm
    JOIN TEAM t
        ON tm.team_id = t.team_id
    JOIN GAME_ACCOUNT ga
        ON tm.game_account_id = ga.account_id
    JOIN GAME g
        ON t.game_id = g.game_id
    WHERE ga.user_id = ?
    ORDER BY t.created_at DESC
`;
db.query(
    sql,
    [userId],
    (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                error: "FAILED TO FETCH MY TEAMS"
            });
        }

        return res.status(200).json({
            teams: results
        });
    }
);
});

router.get("/:id", requireAuth, (req, res) => {
    const teamId = req.params.id;
    const sql = `
    SELECT
        t.team_id,
        t.team_name,
        t.team_tag,
        t.status,
        g.game_name,
        ga.account_id,
        ga.game_username,
        tm.role,
        tm.is_substitute,
        tm.is_active
    FROM TEAM t
    JOIN GAME g
        ON t.game_id = g.game_id
    JOIN TEAM_MEMBER tm
        ON t.team_id = tm.team_id
    JOIN GAME_ACCOUNT ga
        ON tm.game_account_id = ga.account_id
    WHERE t.team_id = ?
    ORDER BY tm.role = 'captain' DESC, tm.is_substitute ASC;
`;
db.query(
    sql,
    [teamId],
    (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                error: "FAILED TO FETCH TEAM"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                error: "TEAM NOT FOUND"
            });
        }

        const team = {
    team_id: results[0].team_id,
    team_name: results[0].team_name,
    team_tag: results[0].team_tag,
    status: results[0].status,
    game_name: results[0].game_name,
    members: []
};
results.forEach((row) => {
    team.members.push({
        account_id: row.account_id,
        game_username: row.game_username,
        role: row.role,
        is_substitute: row.is_substitute,
        is_active: row.is_active
    });
});
return res.status(200).json({
    team: team
});
    }
);
});

router.post("/", requireAuth, (req, res) => {
    const userId = req.session.userId;

    const {
        game_id,
        team_name,
        team_tag
    } = req.body;

    // Validate required fields
    if (!game_id || !team_name || !team_tag) {
        return res.status(400).json({
            error: "GAME ID, TEAM NAME, AND TEAM TAG ARE REQUIRED"
        });
    }

    // Find the logged-in user's game account
    const captainCheckSql = `
        SELECT account_id
        FROM GAME_ACCOUNT
        WHERE user_id = ? AND game_id = ?
        LIMIT 1
    `;

    db.query(
        captainCheckSql,
        [userId, game_id],
        (err, captainResults) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    error: "FAILED TO CHECK CAPTAIN GAME ACCOUNT"
                });
            }

            if (captainResults.length === 0) {
                return res.status(400).json({
                    error: "YOU MUST HAVE A GAME ACCOUNT FOR THIS GAME"
                });
            }

            const captainId = captainResults[0].account_id;

            // Start transaction
            db.beginTransaction((err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({
                        error: "FAILED TO START TEAM CREATION"
                    });
                }

                console.log("Transaction started successfully");

                // Insert team
                const insertTeamSql = `
                    INSERT INTO TEAM (
                        game_id,
                        captain_id,
                        team_name,
                        team_tag,
                        status
                    )
                    VALUES (?, ?, ?, ?, 'forming')
                `;

                db.query(
                    insertTeamSql,
                    [game_id, captainId, team_name, team_tag],
                    (err, teamResults) => {
                        if (err) {
                            console.error(err);

                            return db.rollback(() => {
                                res.status(500).json({
                                    error: "FAILED TO CREATE TEAM"
                                });
                            });
                        }

                        const teamId = teamResults.insertId;

                        // Insert captain into TEAM_MEMBER
                        const insertCaptainSql = `
                            INSERT INTO TEAM_MEMBER (
                                team_id,
                                game_account_id,
                                role,
                                is_substitute,
                                is_active
                            )
                            VALUES (?, ?, 'captain', FALSE, TRUE)
                        `;

                        db.query(
                            insertCaptainSql,
                            [teamId, captainId],
                            (err) => {
                                if (err) {
                                    console.error(err);

                                    return db.rollback(() => {
                                        res.status(500).json({
                                            error: "FAILED TO ADD CAPTAIN TO TEAM"
                                        });
                                    });
                                }

                                // Both inserts succeeded
                                db.commit((err) => {
                                    if (err) {
                                        console.error(err);

                                        return db.rollback(() => {
                                            res.status(500).json({
                                                error: "FAILED TO COMPLETE TEAM CREATION"
                                            });
                                        });
                                    }

                                    return res.status(201).json({
                                        message: "TEAM CREATED SUCCESSFULLY",
                                        teamId: teamId
                                    });
                                });
                            }
                        );
                    }
                );
            });
        }
    );
});

module.exports = router;