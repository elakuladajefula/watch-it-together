import db from '../config/database.js';

/**
 * Send invitation to user with passed login
 * 
 * @param {*} userID 
 * @param {*} friendLogin 
 * @param {*} result 
 */
export const sendInvitation = (userID, friendLogin, result) => 
{
    db.query("INSERT INTO friends (UserID, FriendID, Status) VALUES (?, (SELECT ID FROM users WHERE Login = ?), 'INVITED')", [userID, friendLogin], (err, results) =>
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
 * Return list of all friends that invited user and that were invited by user
 * 
 * @param {*} id
 * @param {*} result
 */
export const getFriendsList = (id, result) => 
{
    db.query("SELECT Login FROM friends JOIN users ON friends.UserID = users.ID WHERE friends.FriendID = ? AND Status = 'ADDED' UNION SELECT Login FROM friends JOIN users ON friends.FriendID = users.ID WHERE friends.UserID = ? AND Status = 'ADDED'", [id, id], (err, results) =>
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
 * Return status of connection between 2 users
 * 
 * @param {*} id 
 * @param {*} login 
 * @param {*} result 
 */
export const getFriendStatus = (id, login, result) => 
{
    db.query("SELECT Status FROM friends JOIN users ON friends.UserID = users.ID WHERE friends.FriendID = ? AND users.Login = ? UNION SELECT Status FROM friends JOIN users ON friends.FriendID = users.ID WHERE friends.UserID = ? AND users.Login = ?", [id, login, id, login], (err, results) =>
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
 * Change status of friendship to ACCEPTED
 * 
 * @param {*} id ID of the user logged in
 * @param {*} login login of the user who sent invitation
 * @param {*} result 
 */
export const acceptInvite = (id, login, result) => 
{
    db.query("UPDATE friends SET Status = 'ACCEPTED' WHERE UserID = (SELECT ID FROM users WHERE Login = ?) AND FriendID = ?", [login, id], (err, results) =>
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
 * Change status of friendship to REJECTED
 * 
 * @param {*} id ID of the user logged in
 * @param {*} login login of the user who sent invitation
 * @param {*} result 
 */
export const rejectInvite = (id, login, result) => 
{
    db.query("UPDATE friends SET Status = 'REJECTED' WHERE UserID = (SELECT ID FROM users WHERE Login = ?) AND FriendID = ?", [login, id], (err, results) =>
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