import express from "express";
import { logInUser, showInvitations, registerUser, changePassword, searchFriends } from "../controllers/user.js";
import { addShow, removeShow, updateShow, listShows, listFriendShows } from "../controllers/show.js";
import { addFriend, showFriends } from "../controllers/friend.js";

const router = express.Router();

router.get("/users", logInUser);
router.get("/users/:id", showInvitations);
router.post("/users", registerUser);
router.put("/users", changePassword);
router.get("/users", searchFriends);

router.post("/tvshows", addShow);
router.delete("/tvshows", removeShow);
router.put("/tvshows", updateShow);
router.get("/tvshows/:id", listShows);
router.get("/tvshows/:login", listFriendShows);

router.post("/friends", addFriend);
router.get("/friends/:userID", showFriends);

export default router;