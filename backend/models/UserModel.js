import db from '../config/database.js';

/**
 * Logging in with correct credentials returns userID
 * Wrong credentials return error
 * 
 * @param {*} login user login
 * @param {*} pass user password
 * @param {*} result
 */
export const getUserID = (login, pass, result) => 
{
    db.query("SELECT ID FROM users WHERE Login = ? AND Password = ?", [login, pass], (err, results) =>
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
 * If login and old password are correct, change password to newPass
 * 
 * @param {*} newPass new user password
 * @param {*} login user login
 * @param {*} oldPass old user password
 * @param {*} result 
 */
export const changeUserSettings = (newPass, login, oldPass, result) => 
{
    db.query("UPDATE users SET Password = ? WHERE Login = ? AND Password = ?", [newPass, login, oldPass], (err, results) =>
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