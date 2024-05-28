const pool = require('../../DB/Database');

async function addcomplaine(req, res) {
    const {
        complaint_from,
        complaint_against,
        title,
        complaint_date,
        description,
        created_by,
    } = req.body;

    try {
        if(!complaint_against || !description){
            return res.status(200).json({ status: 400, message: 'Please Field All Fields' });
        }
        pool.query(
            `INSERT INTO complaints (complaint_from, 
                complaint_against, title, 
                complaint_date, description, created_by)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
                complaint_from,
                complaint_against,
                title,
                complaint_date,
                description,
                created_by,
            ],
            (err, result) => {
                if (err) {
                    console.error('Error executing SQL query:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                return res.status(200).json({ status: 200, message: 'Complaint Register Successfully' });
            }
        );
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = addcomplaine;
