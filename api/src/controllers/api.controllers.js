const db = require('../db');
const jwt = require('jsonwebtoken');
const {SECRET} = require('../constants')


exports.addGolfClub = async(req, res) => {
    let token = req.cookies.token;
    if (!token) {
        // Handle the case when there's no token (user not authenticated)
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const {club_type, club_number} = req.body
    try {
        let decoded = jwt.verify(token, SECRET);
        let golf_player = decoded.id;
        await db.query(`INSERT INTO golf_club (golf_bag_id, club_type, club_number)
                        VALUES ((SELECT id FROM golf_bag WHERE player_id = $1), $2, $3)`, [golf_player, club_type, club_number])
        return res.status(200).json({
            success: true,
            message: 'Golf club added successfully!'
        })
        } catch (error) {
            res.status(500).json({
                error: error.message
            })
        }

}

exports.getGolfClubs = async(req, res) => {
    let token = req.cookies.token;
    if (!token) {
        // Handle the case when there's no token (user not authenticated)
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        let decoded = jwt.verify(token, SECRET);
        let golf_player = decoded.id

        const gc = await db.query(`SELECT club_type, club_number 
                                   FROM golf_player AS gp
                                   JOIN golf_bag AS gb ON gp.id = gb.player_id
                                   JOIN golf_club AS gc ON gb.id = gc.golf_bag_id
                                   WHERE gp.id = $1;`, [golf_player])

        if (gc.rows.length === 0) {
            throw new Error('No golf clubs.')
        }

        return res.status(200).json({
            success: true,
            message: 'Golf clubs fetched correctly.',
            golf_clubs: gc.rows,
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

    return
}


exports.createGolfBag = async(req, res) => {
    let token = req.cookies.token;
    if (!token) {
        // Handle the case when there's no token (user not authenticated)
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        let decoded = jwt.verify(token, SECRET);
        let golf_player = decoded.id;
        let bag_name = req.body.bag_name;

        await db.query(`INSERT INTO golf_bag (player_id, bag_name) VALUES ($1, $2)`, [golf_player, bag_name])
        return res.status(200).json({
            success: true,
            message: 'Golf bag created successfully!'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }


}

exports.getGolfBag = async (req, res) => {
    let token = req.cookies.token;
    if (!token) {
        // Handle the case when there's no token (user not authenticated)
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        let decoded = jwt.verify(token, SECRET);
        let golf_player = decoded.id

        const gb = await db.query(`SELECT golf_bag.bag_name FROM golf_player 
                        JOIN golf_bag ON golf_player.id = golf_bag.player_id
                        WHERE golf_player.id = $1                
                        `, [golf_player])

        if (gb.rows.length === 0) {
            throw new Error('User has no golf bag.')
        }

        return res.status(200).json({
            success: true,
            message: 'Golf bag fetched correctly.',
            golf_bag: gb.rows,
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

    return
}