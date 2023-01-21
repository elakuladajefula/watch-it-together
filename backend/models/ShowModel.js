import db from '../config/database.js';

/**
 * Add TV show to list
 * 
 * @param {*} userID
 * @param {*} showID 
 */
export const insertShow = (userID, showID, result) => 
{
    db.query("INSERT INTO tvshows (UserID, ShowID, ShowStatus) VALUES (?, ?, 'ADDED')", [userID, showID], (err, results) =>
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
 * Delete TV show from list
 * 
 * @param {*} userID 
 * @param {*} showID 
 */
export const deleteShow = (userID, showID, result) => 
{
    db.query("DELETE FROM tvshows WHERE UserID = ? AND ShowID = ?", [userID, showID], (err, results) =>
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
 * Change TV show status to watched
 * 
 * @param {*} userID 
 * @param {*} showID 
 */
export const watchShow = (userID, showID, result) => 
{
    db.query("UPDATE tvshows SET ShowStatus = 'WATCHED' WHERE UserID = ? AND ShowID = ?", [userID, showID], (err, results) =>
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
 * Change TV show status to watched
 * 
 * @param {*} userID 
 * @param {*} showID 
 */
export const unwatchShow = (userID, showID, result) => 
{
    db.query("UPDATE tvshows SET ShowStatus = 'ADDED' WHERE UserID = ? AND ShowID = ?", [userID, showID], (err, results) =>
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
 * Select all shows added to list
 * 
 * @param {*} id 
 * @param {*} result 
 */
export const getShows = (id, result) => 
{
    db.query("SELECT ShowID, ShowStatus FROM tvshows WHERE UserID = ? AND ShowStatus = 'ADDED'", [id], (err, results) =>
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
 * Select all shows but only ShowID
 * 
 * @param {*} id 
 * @param {*} result 
 */
export const getMyShows = (id, result) => 
{
    db.query("SELECT ShowID FROM tvshows WHERE UserID = ? AND ShowStatus = 'ADDED'", [id], (err, results) =>
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
 * Select all shows added to list by friend
 * 
 * @param {*} login
 * @param {*} result 
 */
export const getFriendShows = (login, result) => 
{
    db.query("SELECT ShowID FROM tvshows JOIN users ON tvshows.userID = users.ID WHERE users.Login = ? AND tvshows.ShowStatus = 'ADDED'", [login], (err, results) =>
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
 * Check if show was added to list
 * 
 * @param {*} userID 
 * @param {*} showID 
 * @param {*} result 
 */
export const getShowStatus = (userID, showID, result) => 
{
    db.query("SELECT ShowStatus FROM tvshows WHERE UserID = ? AND ShowID = ?", [userID, showID], (err, results) =>
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