import express from "express";
import jwt from 'jsonwebtoken';
import { logInUser, showInvitations, registerUser, changePassword, searchFriends, verifyUser, verifyUserByID } from "../controllers/user.js";
import { addShow, removeShow, updateShow, listShows, listMyShows, listFriendShows, unupdateShow, getStatus } from "../controllers/show.js";
import { acceptFriend, addFriend, rejectFriend, showFriends, showStatus } from "../controllers/friend.js";

const router = express.Router();

router.get("/verifyUsers/:login", verifyUser);
router.get("/verifyUsersByID/:id", verifyUserByID);

router.get("/users/:login", logInUser);
router.get("/users/:id", authenticateToken, showInvitations);
router.post("/users/:login/:pass", registerUser);
router.put("/users/:newPass/:id", authenticateToken, changePassword);

router.get("/user/:name/:id", authenticateToken, searchFriends);


router.post("/tvshows/:userID/:showID", authenticateToken, addShow);
router.delete("/tvshows/:userID/:showID", authenticateToken, removeShow);
router.get("/tvshows/:userID/:showID", authenticateToken, getStatus);
router.put("/tvshows/:userID/:showID", authenticateToken, updateShow);

router.get("/mytvshows/:id", authenticateToken, listShows);
router.put("/mytvshows/:userID/:showID", authenticateToken, unupdateShow);

router.get("/mytvshowsid/:id", authenticateToken, listMyShows);

router.get("/friendtvshows/:login", authenticateToken, listFriendShows);


router.post("/friends/:userID/:friendLogin", authenticateToken, addFriend);
router.get("/friends/:userID", authenticateToken, showFriends);
router.put("/friends/:userID/:friendLogin", authenticateToken, acceptFriend);

router.put("/friendstatus/:userID/:friendLogin", authenticateToken, rejectFriend);
router.get("/friendstatus/:userID/:friendLogin", authenticateToken, showStatus);
  
function authenticateToken(req, res, next)
{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) 
    {
        return res.sendStatus(401);
    }
  
    jwt.verify(token, 'mySuperLongAndSecretStringNoOneKnows', (err, user) => 
    {
        if (err)
        {
            console.log(err);
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    })
}

export default router;