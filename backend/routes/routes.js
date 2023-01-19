import express from "express";
import { logInUser, showInvitations, registerUser, changePassword, searchFriends } from "../controllers/user.js";
import { addShow, removeShow, updateShow, listShows, listFriendShows, unupdateShow, getStatus } from "../controllers/show.js";
import { acceptFriend, addFriend, rejectFriend, showFriends, showStatus } from "../controllers/friend.js";

const router = express.Router();

router.get("/users/:login/:pass", logInUser);
router.get("/users/:id", showInvitations);
router.post("/users/:login/:pass", registerUser);
router.put("/users/:newPass/:id/:oldPass", changePassword);

router.get("/user/:name/:id", searchFriends);


router.post("/tvshows/:userID/:showID", addShow);
router.delete("/tvshows/:userID/:showID", removeShow);
router.get("/tvshows/:userID/:showID", getStatus);
router.put("/tvshows/:userID/:showID", updateShow);

router.get("/mytvshows/:id", listShows);
router.put("/mytvshows/:userID/:showID", unupdateShow);

router.get("/friendtvshows/:login", listFriendShows);


router.post("/friends/:userID/:friendLogin", addFriend);
router.get("/friends/:userID", showFriends);
router.put("/friends/:userID/:friendLogin", acceptFriend);

router.put("/friendstatus/:userID/:friendLogin", rejectFriend);
router.get("/friendstatus/:userID/:friendLogin", showStatus);

export default router;