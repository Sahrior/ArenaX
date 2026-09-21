const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

const authRoutes = require("./routes/authRoutes");
const gameRoutes = require("./routes/gameRoutes");
const gameAccountRoutes = require("./routes/gameAccountRoutes");

const app = express();

const sessionStore = new MySQLStore({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "ArenaX"
});

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);

app.use(express.json());

app.use(
    session({
        key: "arenax_session",
        secret: "arenax_secret_key_change_later",
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24
        }
    })
);

app.get("/", (req, res) => {
    res.send("ArenaX Backend is running!");
});
const {requireAuth,requireRole}=require("./middleware/authmiddleware")
app.use("/api/auth", authRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/game-accounts", gameAccountRoutes);
app.get("/api/test-organizer",requireRole("organizer"),
    (req,res)=>{
        res.json({
            message:"You have accessed an organizer protected route!",
        })
    }
)

app.get("/api/test-protected", requireAuth, (req, res) => {
    res.status(200).json({
        message: "You have accessed a protected route!",
        userId: req.session.userId
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});