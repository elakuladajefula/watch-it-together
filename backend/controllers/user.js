import { getUserID, getInvitations, getRegistered, changeUserSettings, getUserByName, getUserPassword, getUserPasswordByID } from "../models/UserModel.js";

export const logInUser = (req, res) => 
{
    getUserID(req.params.login, (err, results) =>
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

export const verifyUser = (req, res) => 
{
    getUserPassword(req.params.login, (err, results) =>
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

export const verifyUserByID = (req, res) => 
{
    getUserPasswordByID(req.params.id, (err, results) =>
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

export const showInvitations = (req, res) => 
{
    getInvitations(req.params.id, (err, results) =>
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

export const registerUser = (req, res) => 
{
    getRegistered(req.params.login, req.params.pass, (err, results) =>
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

export const changePassword = (req, res) => 
{
    changeUserSettings(req.params.newPass, req.params.id, (err, results) =>
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

export const searchFriends = (req, res) => 
{
    getUserByName(req.params.name, req.params.id, (err, results) =>
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