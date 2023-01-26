import db from '../config/database.js';
import jwt from 'jsonwebtoken';
const { sign } = jwt;

function jwtSignUser(user) 
{
    const ONE_DAY = 60 * 60 * 24;
    return sign(user, 'mySuperLongAndSecretStringNoOneKnows', { expiresIn: ONE_DAY });
}

/**
 * Return user ID and authentication token
 * 
 * @param {*} login user login
 * @param {*} result
 */
export const getUserID = (login, result) => 
{
    db.query("SELECT ID FROM users WHERE Login = ?", [login], (err, results) =>
    {
        if (err)
        {
            console.log(err);
            result(err, null);
        }
        else
        {
            if (results[0] != null)
            {
                results[1] = jwtSignUser(results[0]);
            }
            result(null, results);
        }
    })
}

/**
 * Return user password to verify it
 * 
 * @param {*} login 
 * @param {*} result 
 */
export const getUserPassword = (login, result) => 
{
    db.query("SELECT Password FROM users WHERE Login = ?", [login], (err, results) =>
    {
        if (err)
        {
            console.log(err);
            result(err, null);
        }
        else
        {
            result(null, results[0]);
        }
    })
}

/**
 * Return user old password to verify before changing it
 * 
 * @param {*} ID 
 * @param {*} result 
 */
export const getUserPasswordByID = (id, result) => 
{
    db.query("SELECT Password FROM users WHERE ID = ?", [id], (err, results) =>
    {
        if (err)
        {
            console.log(err);
            result(err, null);
        }
        else
        {
            result(null, results[0]);
        }
    })
}

/**
 * Return all pending invitations
 * 
 * @param {*} id user ID
 * @param {*} result 
 */
export const getInvitations = (id, result) => 
{
    db.query("SELECT Login FROM friends JOIN users ON friends.UserID = users.ID WHERE friends.FriendID = ? AND Status = 'INVITED'", [id], (err, results) =>
    {
        if (err)
        {
            console.log(err);
            result(err, null);
        }
        else
        {
            result(null, results);
        }
    })
}

/**
 * If the login passed by user is already used, return error
 * Else insert values to DB
 * 
 * @param {*} login user login
 * @param {*} pass user password
 * @param {*} result 
 */
export const getRegistered = (login, pass, result) => 
{
    db.query("INSERT INTO users (Login, Password) VALUES (?, ?)", [login, pass], (err, results) =>
    {
        if (err)
        {
            console.log(err);
            result(err, null);
        }
        else
        {
            result(null, results);
        }
    })
}

/**
 * Change user password to newPass
 * 
 * @param {*} newPass new user password
 * @param {*} login user login
 * @param {*} result 
 */
export const changeUserSettings = (newPass, id, result) => 
{
    db.query("UPDATE users SET Password = ? WHERE ID = ?", [newPass, id], (err, results) =>
    {
        if (err)
        {
            console.log(err);
            result(err, null);
        }
        else
        {
            result(null, results);
        }
    })
}

/**
 * Search all users with login containing passed string
 * 
 * @param {*} name 
 * @param {*} result 
 */
export const getUserByName = (name, id, result) => 
{
    var keyword = "%" + name + "%"
    db.query("SELECT Login FROM users WHERE Login LIKE ? AND ID NOT LIKE ?", [keyword, id], (err, results) =>
    {
        if (err)
        {
            console.log(err);
            result(err, null);
        }
        else
        {
            result(null, results);
        }
    })
}