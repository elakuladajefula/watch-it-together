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