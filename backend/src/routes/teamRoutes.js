const express = require("express");
const db = require("../config/db");
const { requireAuth } = require("../middleware/authMiddleware");

const router = express.Router();

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