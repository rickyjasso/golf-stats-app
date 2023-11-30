const pool = require('../database');

const getGolfBag = async (req, res, next) => {
    try {
        // const {id} = req.params
        // TODO: GET FROM USER ID
        const {id} = req.params;
        const result = await pool.query(`SELECT gc.* 
                                        FROM golf_club gc
                                        JOIN golf_bag gb ON gc.golf_bag_id = gb.id 
                                        JOIN golf_player gp ON gb.player_id = gp.id
                                        WHERE gp.id = $1`, [id])

        if (result.rows.length === 0){
            return res.status(404).json({
                message: 'No golf bag created'
            })
        }

        res.json(result.rows)
    } catch (error) {
        next(error)
    }
};

module.exports = {
    getGolfBag,
};