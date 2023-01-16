import { getFriendsList, getFriendStatus, sendInvitation } from "../models/FriendModel.js";

export const addFriend = (req, res) => 
{
    sendInvitation(req.params.userID, req.params.friendLogin, (err, results) =>
    {
        if (err)
        {
            res.send(err);
        }
        else
        {
            res.json(results);
        }
    })
}

export const showFriends = (req, res) => 
{
    getFriendsList(req.params.userID, (err, results) =>
    {
        if (err)
        {
            res.send(err);
        }
        else
        {
            res.json(results);
        }
    })
}

export const showStatus = (req, res) => 
{
    getFriendStatus(req.params.userID, req.params.friendLogin, (err, results) =>
    {
        if (err)
        {
            res.send(err);
        }
        else
        {
            res.json(results);
        }
    })
}