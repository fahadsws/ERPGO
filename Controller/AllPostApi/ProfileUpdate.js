const pool = require('../../DB/Database');

async function profileupdate(req, res) {
    const {
        id,
        name,
        email,
    } = req.body;

    try {
        pool.query(
            `UPDATE users SET name = ? , email = ? 
             WHERE id = ?`,
            [
               name,email,id
            ],
            (err, result) => {
                if (err) {
                    console.error('Error executing SQL query:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                if(!name || !email){
                return res.status(200).json({ status: 200, message: 'Please Field All Fields' });
                }
                return res.status(200).json({ status: 200, message: 'Profile Updated Successfully' });
            }
        );
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = profileupdate;
