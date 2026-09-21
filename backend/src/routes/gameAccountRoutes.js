const express = require("express");
const db = require("../config/db");
const { requireAuth } = require("../middleware/authMiddleware");

const router = express.Router();


// GET /api/game-accounts/my
// Get all game accounts belonging to the logged-in user
router.get("/my", requireAuth, (req, res) => {
    const userId = req.session.userId;

    const sql = `
        SELECT
            account_id,
            game_id,
            game_username,
            game_uid,
            server_region,
            is_free_agent,
            university
        FROM GAME_ACCOUNT
        WHERE user_id = ?
    `;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error(err);

            return res.status(500).json({
                error: "FAILED TO FETCH GAME ACCOUNTS"
            });
        }

        res.status(200).json({
            gameAccounts: results
        });
    });
});


// POST /api/game-accounts
// Create a new game account for the logged-in user
router.post("/", requireAuth, (req, res) => {

    const userId = req.session.userId;

    const {
        game_id,
        game_username,
        game_uid,
        server_region,
        is_free_agent,
        university
    } = req.body;


    // 1. Validate required information
    if (!game_id || !game_username || !game_uid || !server_region) {
        return res.status(400).json({
            error: "Game ID, username, UID and server region are required"
        });
    }


    // 2. Check whether the game exists
    const gameCheckSql = `
        SELECT game_id
        FROM GAME
        WHERE game_id = ?
    `;

    db.query(gameCheckSql, [game_id], (err, gameResults) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                error: "FAILED TO CHECK GAME"
            });
        }

        if (gameResults.length === 0) {
            return res.status(400).json({
                error: "GAME NOT FOUND"
            });
        }


        // 3. Check whether this user already has an account for this game
        const duplicateCheckSql = `
            SELECT account_id
            FROM GAME_ACCOUNT
            WHERE user_id = ? AND game_id = ?
        `;

        db.query(
            duplicateCheckSql,
            [userId, game_id],
            (err, duplicateResults) => {

                if (err) {
                    console.error(err);

                    return res.status(500).json({
                        error: "FAILED TO CHECK DUPLICATE GAME ACCOUNT"
                    });
                }

                if (duplicateResults.length > 0) {
                    return res.status(409).json({
                        error: "GAME ACCOUNT ALREADY EXISTS"
                    });
                }


                // 4. Check whether this game UID is already registered
                const uidCheckSql = `
                    SELECT account_id
                    FROM GAME_ACCOUNT
                    WHERE game_id = ? AND game_uid = ?
                `;

                db.query(
                    uidCheckSql,
                    [game_id, game_uid],
                    (err, uidResults) => {

                        if (err) {
                            console.error(err);

                            return res.status(500).json({
                                error: "FAILED TO CHECK GAME UID"
                            });
                        }

                        if (uidResults.length > 0) {
                            return res.status(409).json({
                                error: "GAME UID IS ALREADY REGISTERED"
                            });
                        }


                        const insertSql = `
                                INSERT INTO GAME_ACCOUNT (
                                    user_id,
                                    game_id,
                                    game_username,
                                    game_uid,
                                    server_region,
                                    is_free_agent,
                                    university
                                )
                                VALUES (?, ?, ?, ?, ?, ?, ?)
                            `;

                        db.query(
                            insertSql,
                            [
                                userId,
                                game_id,
                                game_username,
                                game_uid,
                                server_region,
                                is_free_agent,
                                university
                            ],
                            (err, insertResults) => {

                                if (err) {
                                    console.error(err);

                                    return res.status(500).json({
                                        error: "FAILED TO INSERT GAME ACCOUNT"
                                    });
                                }

                                res.status(201).json({
                                    message: "GAME ACCOUNT CREATED SUCCESSFULLY",
                                    accountId: insertResults.insertId
                                });
                            }
                        );
                    }
                );
            }
        );
    });
});

// PUT /api/game-accounts/:id
// Update a game account for the logged-in user
router.put("/:id", requireAuth, (req, res) => {
    const accountId = req.params.id;
    const userId = req.session.userId;

    const { game_username,
        game_uid,
        server_region,
     } = req.body;

    if (!game_username|| !game_uid || !server_region) {
        return res.status(400).json({
            error: "GAME USERNAME, GAME UID, AND SERVER REGION ARE REQUIRED"
        });
    }
    const ownershipCheckSql = `
        SELECT account_id,game_id
        FROM GAME_ACCOUNT
        WHERE account_id = ? AND user_id = ?
    `;
    db.query(ownershipCheckSql, [accountId, userId], (err, ownershipResults) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                error: "FAILED TO CHECK ACCOUNT OWNERSHIP"
            });
        }

        if (ownershipResults.length === 0) {
            return res.status(404).json({
                error: "YOU ARE NOT THE OWNER OF THIS ACCOUNT"
            });
        }

        const currentGameId = ownershipResults[0].game_id;

        const uidCheckSql = `
            SELECT account_id
            FROM GAME_ACCOUNT
            WHERE game_id = ? AND game_uid = ? AND account_id != ?
        `;
        db.query(uidCheckSql, [currentGameId, game_uid, accountId], (err, uidResults) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    error: "FAILED TO CHECK GAME UID"
                });
            }

            if (uidResults.length > 0) {
                return res.status(409).json({
                    error: "THIS GAME UID IS ALREADY IN USE"
                });
            }

            // If we reach here, the user is the owner of the account
            // Proceed with the update logic
        });
    });
});


module.exports = router;