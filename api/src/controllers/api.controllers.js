const db = require('../db');
const jwt = require('jsonwebtoken');
const {SECRET} = require('../constants');
const { response } = require('express');


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

        const gc = await db.query(`SELECT gc.id AS club_id, club_type, club_number 
                                   FROM golf_player AS gp
                                   JOIN golf_bag AS gb ON gp.id = gb.player_id
                                   JOIN golf_club AS gc ON gb.id = gc.golf_bag_id
                                   WHERE gp.id = $1;`, [golf_player])

        if (gc.rows.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No clubs to fetch.'
            })
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

exports.deleteGolfClub = async (req, res) => {
    let token = req.cookies.token;
    if (!token) {
        // Handle the case when there's no token (user not authenticated)
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const {id} = req.params
        const result = await db.query(`DELETE FROM golf_club WHERE id = $1`, [id])
        if (result.rowCount === 0) return res.status(404).json({
            message: "Club not found",
        });
        return res.status(204).json({
            success: true,
            message: 'Golf club deleted correctly.',
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.updateGolfClub = async (req, res) => {
    let token = req.cookies.token;
    if (!token) {
        // Handle the case when there's no token (user not authenticated)
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const {id} = req.params;
        const {club_type, club_number} = req.body;
        const result = await db.query(`UPDATE golf_club SET club_type = $1, club_number = $2 WHERE id = $3 RETURNING *`, [club_type, club_number, id])
        if (result.rowCount === 0) return res.status(404).json({
            message: "Club not found",
        });
        return res.status(204).json({
            success: true,
            message: 'Golf club updated correctly.',
            res: result.rows[0]
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
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

exports.getAllCourses = async (req, res) => {
    try {
        const result = await db.query(`SELECT * FROM golf_course`)
        return res.status(200).json({
            success: true,
            message: 'Golf courses fetched correctly.',
            golf_courses: result.rows,
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.getGolfCourse = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await db.query(`SELECT * FROM golf_course WHERE id = $1`, [id])
        return res.status(200).json({
            success: true,
            message: 'Golf course fetched correctly.',
            golf_course: result.rows[0]
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

}

// ! HERE

exports.newGolfRound = async(req, res) => {
    let token = req.cookies.token;
    if (!token) {
        // Handle the case when there's no token (user not authenticated)
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        let decoded = jwt.verify(token, SECRET);
        let golf_player = decoded.id;
        let {course_id, num_holes} = req.body;
        const date = new Date()
        const todaysDate = date.toISOString()
        let response = await db.query(`INSERT INTO golf_round (player_id, course_id, round_score, round_date, num_holes)
                        VALUES ($1, $2, 0, $3, $4) RETURNING id`, [golf_player, course_id, todaysDate, num_holes]);
        return res.status(200).json({
            success: true,
            message: 'Golf round created correctly.',
            res: response.rows[0],
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.getGolfRounds = async(req, res) => {
    let token = req.cookies.token;
    if (!token) {
        // Handle the case when there's no token (user not authenticated)
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        let decoded = jwt.verify(token, SECRET);
        let golf_player = decoded.id;
        let response = await db.query(`SELECT * FROM golf_round WHERE player_id = $1`, [golf_player]);
        
        return res.status(200).json({
            success: true,
            message: 'Golf rounds by player fetched correctly.',
            golf_rounds: response.rows,
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.getGolfRound = async(req, res) => {
    let token = req.cookies.token;
    if (!token) {
        // Handle the case when there's no token (user not authenticated)
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    try {
        let decoded = jwt.verify(token, SECRET);
        let golf_player = decoded.id;
        const {id} = req.params
        let response = await db.query(`SELECT * FROM golf_round WHERE player_id = $1 AND id = $2`, [golf_player, id]);
        
        return res.status(200).json({
            success: true,
            message: 'Golf rounds by player fetched correctly.',
            golf_round: response.rows[0],
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.getGolfRoundHoles = async(req, res) => {
    let token = req.cookies.token;
    if (!token) {
        // Handle the case when there's no token (user not authenticated)
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    try {
        const {id} = req.params
        let response = await db.query(`SELECT gh.id, gh.hole_number, gh.par, gh.distance, gh.hole_score, gr.round_score, gr.round_date
        FROM golf_hole gh
        JOIN golf_course gc ON gh.course_id = gc.id
        JOIN golf_round gr ON gc.id = gr.course_id
        WHERE gr.id = $1;`, [id]);
        
        return res.status(200).json({
            success: true,
            message: 'Golf holes for this round fetched correctly.',
            golf_roundholes: response.rows,
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.getGolfHole = async(req, res) => {
    let token = req.cookies.token;
    if (!token) {
        // Handle the case when there's no token (user not authenticated)
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    try {
        const {id} = req.body
        let response = await db.query(`SELECT * FROM golf_hole WHERE id = $1`, [id]);
        
        return res.status(200).json({
            success: true,
            message: 'Golf hole fetched correctly.',
            golf_hole: response.rows[0],
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.getGolfHoleScore = async(req, res) => {
    let token = req.cookies.token;
    if (!token) {
        // Handle the case when there's no token (user not authenticated)
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    try {
        const {id} = req.query
        let response = await db.query(`SELECT hole_score FROM golf_hole WHERE id = $1`, [id]);
        
        return res.status(200).json({
            success: true,
            message: 'Golf hole score fetched correctly.',
            golf_hole_score: response.rows[0],
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.newGolfHole = async(req, res) => {
    
    try {
        let {round_id, course_id, hole_number, par, distance} = req.body;
        let response = await db.query(`
        INSERT INTO golf_hole (round_id, course_id, hole_number, par, distance, hole_score)
        VALUES ($1, $2, $3, $4, $5, 0)
        RETURNING id;
        `, [round_id, course_id, hole_number, par, distance]);
        return res.status(200).json({
        success: true,
        message: 'Golf hole created correctly.',
        res: response.rows[0],
    })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }                
}

// TODO: INSERT A NEW GOLF HOLE AND UPDATE GOLF_ROUND SCORE ON SUBMIT HOLE, 

exports.finishedHole = async(req, res) => {
    let token = req.cookies.token;
    if (!token) {
        // Handle the case when there's no token (user not authenticated)
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        let {hole_score, round_id} = req.body;
        console.log(req.body)
        let response = await db.query(`UPDATE golf_round
                                   SET round_score = COALESCE(round_score, 0) + $1
                                   WHERE id = $2 RETURNING *`, [hole_score, round_id]);
        return res.status(200).json({
        success: true,
        message: 'Hole completed.',
        res: response.rows[0],
    })                       
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}


// TODO: INSERT NEW GOLF SHOT AND UPDATE GOLF_HOLE SCORE ON SUBMIT SHOT

exports.newGolfShot = async(req, res) => {
    try {
        let {hole_id, distance, golf_club_id, shape, outcome, good_shot} = req.body;
        let response = await db.query(`INSERT INTO golf_shot (hole_id, distance, golf_club_id, shape, outcome, good_shot)
                                    VALUES ($1, $2, $3, $4, $5, $6)`, [hole_id, distance, golf_club_id, shape, outcome, good_shot]);
        await db.query(`UPDATE golf_hole
        SET hole_score = hole_score + 1
        WHERE id = $1`, [hole_id]);
        return res.status(200).json({
        success: true,
        message: 'Shot submitted.',
        res: response.rows[0],
    })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.deleteGolfHole = async(req, res) => {
    let token = req.cookies.token;
    if (!token) {
        // Handle the case when there's no token (user not authenticated)
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        let {id} = req.params
        let {hole_score, round_id} = req.body;
        await db.query('DELETE FROM golf_shot WHERE hole_id = $1', [id])
        let result = await db.query(`DELETE FROM golf_hole WHERE id = $1`, [id])
        await db.query(`UPDATE golf_round SET round_score = COALESCE(round_score, 0) - $1
                                   WHERE id = $2 RETURNING *`, [hole_score, round_id]);
        if (result.rowCount === 0) return res.status(404).json({
            message: "Hole not found",
        });
        return res.status(204).json({
            success: true,
            message: 'Golf hole deleted correctly.',
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.getHoleShots = async(req, res) => {
    let token = req.cookies.token;
    if (!token) {
        // Handle the case when there's no token (user not authenticated)
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const {holeId} = req.query
        let response = await db.query(`SELECT * FROM golf_shot WHERE hole_id = $1`, [holeId]);
        return res.status(200).json({
            success: true,
            message: 'Golf hole score fetched correctly.',
            golf_hole_shots: response.rows,
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.deleteGolfShot = async(req, res) => {
    let token = req.cookies.token;
    if (!token) {
        // Handle the case when there's no token (user not authenticated)
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        let {id} = req.params
        let {hole_id} = req.body
        let result = await db.query(`DELETE FROM golf_shot WHERE id = $1`, [id])
        await db.query(`UPDATE golf_hole
        SET hole_score = COALESCE(hole_score, 0) - 1
        WHERE id = $1`, [hole_id]);
        if (result.rowCount === 0) return res.status(404).json({
            message: "Shot not found",
        });
        return res.status(204).json({
            success: true,
            message: 'Golf shot deleted correctly.',
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.updateGolfShot = async(req, res) => {
    let token = req.cookies.token;
    if (!token) {
        // Handle the case when there's no token (user not authenticated)
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        let {id} = req.params
        let {distance, golf_club_id, shape, outcome, good_shot} = req.body;
        let result = await db.query(`UPDATE golf_shot SET distance = $1, golf_club_id = $2, shape = $3, outcome = $4, good_shot = $5 WHERE id = $6`, [distance, golf_club_id, shape, outcome, good_shot, id])
        if (result.rowCount === 0) return res.status(404).json({
            message: "Shot not found",
        });
        return res.status(204).json({
            success: true,
            message: 'Golf shot UPDATED correctly.',
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
