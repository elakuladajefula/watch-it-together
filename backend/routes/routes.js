import express from "express";
import { logInUser, showInvitations, registerUser, changePassword, searchFriends } from "../controllers/user.js";
import { addShow, removeShow, updateShow, listShows, listFriendShows, unupdateShow } from "../controllers/show.js";
import { acceptFriend, addFriend, rejectFriend, showFriends, showStatus } from "../controllers/friend.js";

const router = express.Router();

router.get("/users", logInUser);
router.get("/users/:id", showInvitations);
router.post("/users", registerUser);
router.put("/users", changePassword);

router.get("/user/:name/:id", searchFriends);


router.post("/tvshows/:userID/:showID", addShow);
router.delete("/tvshows/:userID/:showID", removeShow);
router.get("/tvshows/:login", listFriendShows);
router.put("/tvshows/:userID/:showID", updateShow);

router.get("/mytvshows/:id", listShows);
router.put("/mytvshows/:userID/:showID", unupdateShow);


router.post("/friends/:userID/:friendLogin", addFriend);
router.get("/friends/:userID", showFriends);
router.put("/friends/:userID/:friendLogin", acceptFriend);

router.put("/friendstatus/:userID/:friendLogin", rejectFriend);
router.get("/friendstatus/:userID/:friendLogin", showStatus);

export default router;