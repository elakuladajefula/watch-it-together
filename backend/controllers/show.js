import { deleteShow, insertShow, watchShow, getShows, getFriendShows } from "../models/ShowModel.js";

export const addShow = (req, res) => 
{
    insertShow(req.params.userID, req.params.showID, (err, results) =>
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

export const removeShow = (req, res) => 
{
    deleteShow(req.params.userID, req.params.showID, (err, results) =>
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

export const updateShow = (req, res) => 
{
    watchShow(req.params.userID, req.params.showID, (err, results) =>
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

export const unupdateShow = (req, res) => 
{
    unwatchShow(req.params.userID, req.params.showID, (err, results) =>
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

export const listShows = (req, res) => 
{
    getShows(req.params.id, (err, results) =>
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

export const listFriendShows = (req, res) => 
{
    getFriendShows(req.params.login, (err, results) =>
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