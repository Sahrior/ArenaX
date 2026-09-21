const express=require("express");
const db=require("../config/db");
const {requireAuth}=require("../middleware/authmiddleware")

const router=express.Router();

router.get("/my",requireAuth,(req,res)=>{
    const userId=req.session.userId;
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
 db.query(sql,[userId],(err,results)=>{
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "FAILED TO FETCH GAME ACCOUNTS" });
    } else {
      res.status(200).json({ 
        gameAccounts:results
       });
    }
 });

 });

 module.exports=router;